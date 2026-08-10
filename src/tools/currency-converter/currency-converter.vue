<template>
  <div class="currency-converter">
    <c-card :title="$t('tools.currency-converter.ratesCardTitle')" class="mb-4">
      <div v-if="loading" class="text-center py-4">
        <n-spin size="large" />
      </div>
      <div v-else>
        <n-alert v-if="error" type="error" class="mb-4">{{ $t('tools.currency-converter.fetchError') }}</n-alert>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
          <div v-for="rateInfo in displayRates" :key="rateInfo.currency" class="flex flex-col">
            <span class="text-gray-500 text-sm font-semibold">{{ rateInfo.label }}</span>
            <span class="text-lg font-bold text-primary">{{ rateInfo.value }}</span>
          </div>
        </div>
        <div class="text-xs text-gray-400 text-right mt-2">
          {{ $t('tools.currency-converter.lastUpdated') }}: {{ lastUpdated }}
        </div>
      </div>
    </c-card>

    <c-card :title="$t('tools.currency-converter.inputCardTitle')">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <c-input-text
          v-model:value="inputs.VND"
          :label="$t('tools.currency-converter.vndLabel')"
          :placeholder="$t('tools.currency-converter.vndPlaceholder')"
          :disabled="loading"
        />
        <c-input-text
          v-model:value="inputs.USD"
          :label="$t('tools.currency-converter.usdLabel')"
          :placeholder="$t('tools.currency-converter.usdPlaceholder')"
          :disabled="loading"
        />
        <c-input-text
          v-model:value="inputs.CNY"
          :label="$t('tools.currency-converter.cnyLabel')"
          :placeholder="$t('tools.currency-converter.cnyPlaceholder')"
          :disabled="loading"
        />
        <c-input-text
          v-model:value="inputs.TWD"
          :label="$t('tools.currency-converter.twdLabel')"
          :placeholder="$t('tools.currency-converter.twdPlaceholder')"
          :disabled="loading"
        />
      </div>
    </c-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { NSpin, NAlert } from 'naive-ui';
import { currencyConverterService, type ExchangeRates } from './currency-converter.service';
import CCard from '@/ui/c-card/c-card.vue';
import CInputText from '@/ui/c-input-text/c-input-text.vue';

const { t, locale } = useI18n();

const loading = ref(true);
const error = ref(false);
const rates = ref<ExchangeRates>({ USD: 1, VND: 25400, CNY: 7.2, TWD: 32.5 });
const lastUpdated = ref<string>('');

const inputs = ref({
  VND: '',
  USD: '',
  CNY: '',
  TWD: ''
});

onMounted(async () => {
  try {
    loading.value = true;
    error.value = false;
    const fetchedRates = await currencyConverterService.getRates();
    rates.value = fetchedRates;
    
    if (typeof window !== 'undefined' && window.localStorage) {
      const cached = localStorage.getItem('yuri_currency_rates_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        lastUpdated.value = new Date(parsed.timestamp).toLocaleString();
      } else {
        lastUpdated.value = new Date().toLocaleString();
      }
    }
  } catch (e) {
    console.error(e);
    error.value = true;
  } finally {
    loading.value = false;
  }
});

const displayRates = computed(() => {
  const currentLocale = locale.value;
  
  const format = (val: number) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(val);
  };
  
  if (currentLocale === 'vi') {
    // Base is VND
    const usdToVnd = rates.value.VND / rates.value.USD;
    const cnyToVnd = rates.value.VND / rates.value.CNY;
    const twdToVnd = rates.value.VND / rates.value.TWD;
    
    return [
      { currency: 'USD', label: '1 USD =', value: `${format(usdToVnd)} VND` },
      { currency: 'CNY', label: '1 CNY =', value: `${format(cnyToVnd)} VND` },
      { currency: 'TWD', label: '1 TWD =', value: `${format(twdToVnd)} VND` }
    ];
  } else if (currentLocale === 'zh') {
    // Base is CNY
    const usdToCny = rates.value.CNY / rates.value.USD;
    const cnyToVnd = rates.value.VND / rates.value.CNY;
    const cnyToTwd = rates.value.TWD / rates.value.CNY;
    
    return [
      { currency: 'USD', label: '1 USD =', value: `${format(usdToCny)} CNY` },
      { currency: 'VND', label: '1 CNY =', value: `${format(cnyToVnd)} VND` },
      { currency: 'TWD', label: '1 CNY =', value: `${format(cnyToTwd)} TWD` }
    ];
  } else {
    // Base is USD
    const vndToUsd = rates.value.VND / rates.value.USD;
    const cnyToUsd = rates.value.CNY / rates.value.USD;
    const twdToUsd = rates.value.TWD / rates.value.USD;
    
    return [
      { currency: 'VND', label: '1 USD =', value: `${format(vndToUsd)} VND` },
      { currency: 'CNY', label: '1 USD =', value: `${format(cnyToUsd)} CNY` },
      { currency: 'TWD', label: '1 USD =', value: `${format(twdToUsd)} TWD` }
    ];
  }
});

let isProgrammaticUpdate = false;

const updateOthers = (currency: keyof ExchangeRates, value: string) => {
  if (isProgrammaticUpdate) return;
  
  if (value === '' || value === null || value === undefined) {
    isProgrammaticUpdate = true;
    const keys: (keyof ExchangeRates)[] = ['VND', 'USD', 'CNY', 'TWD'];
    keys.forEach(k => {
      if (k !== currency) inputs.value[k] = '';
    });
    setTimeout(() => { isProgrammaticUpdate = false; }, 0);
    return;
  }

  const sanitized = String(value).replace(/,/g, '');
  const numVal = parseFloat(sanitized);
  
  if (isNaN(numVal)) {
    isProgrammaticUpdate = true;
    const keys: (keyof ExchangeRates)[] = ['VND', 'USD', 'CNY', 'TWD'];
    keys.forEach(k => {
      if (k !== currency) inputs.value[k] = '';
    });
    setTimeout(() => { isProgrammaticUpdate = false; }, 0);
    return;
  }
  
  isProgrammaticUpdate = true;
  
  const formatOutput = (val: number, cur: string) => {
     if (cur === 'VND') return new Intl.NumberFormat('en-US').format(Math.round(val));
     return new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(val);
  };
  
  // Format the current field itself to ensure commas are added as the user types
  if (currency === 'VND' && value !== '') {
    inputs.value[currency] = formatOutput(numVal, currency as string);
  }

  const keys: (keyof ExchangeRates)[] = ['VND', 'USD', 'CNY', 'TWD'];
  keys.forEach(k => {
    if (k !== currency) {
      const converted = currencyConverterService.convert(numVal, currency, k, rates.value);
      inputs.value[k] = formatOutput(converted, k);
    }
  });
  
  setTimeout(() => { isProgrammaticUpdate = false; }, 0);
};

watch(() => inputs.value.VND, (val) => updateOthers('VND', val));
watch(() => inputs.value.USD, (val) => updateOthers('USD', val));
watch(() => inputs.value.CNY, (val) => updateOthers('CNY', val));
watch(() => inputs.value.TWD, (val) => updateOthers('TWD', val));

</script>
