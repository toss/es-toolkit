import { computed, onMounted, onUnmounted, ref } from 'vue';
import { type Banner, EN_BANNER_DATA, JA_BANNER_DATA, KO_BANNER_DATA, ZH_HANS_BANNER_DATA } from '../data/bannerData';

export function useBanner() {
  const currentLang = ref<string | null>(null);
  const banners = computed<Banner[]>(() => {
    if (currentLang.value === 'ko') {
      return KO_BANNER_DATA;
    }

    if (currentLang.value === 'en') {
      return EN_BANNER_DATA;
    }

    if (currentLang.value === 'ja') {
      return JA_BANNER_DATA;
    }

    if (currentLang.value === 'zh-hans') {
      return ZH_HANS_BANNER_DATA;
    }

    return [];
  });

  const shouldShowBanner = computed(() => {
    return banners.value.length > 0;
  });

  const currentBannerIndex = ref(0);

  const currentBanner = computed(() => {
    if (!shouldShowBanner.value) {
      return null;
    }
    return banners.value[currentBannerIndex.value];
  });

  const rotationInterval = 30000;

  const rotateBanner = () => {
    if (!shouldShowBanner.value) {
      return;
    }
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
  };

  const getRandomBannerIndex = () => {
    return Math.floor(Math.random() * banners.value.length);
  };

  let intervalId: ReturnType<typeof setInterval> | null = null;

  const updateCurrentLang = () => {
    const newLang = getCurrentLang();
    if (newLang !== currentLang.value) {
      currentLang.value = newLang;

      if (shouldShowBanner.value) {
        currentBannerIndex.value = getRandomBannerIndex();
      }
    }
  };

  let originalPushState: typeof history.pushState | null = null;

  onMounted(() => {
    updateCurrentLang();

    if (!shouldShowBanner.value) {
      return;
    }

    currentBannerIndex.value = getRandomBannerIndex();

    intervalId = setInterval(rotateBanner, rotationInterval);

    window.addEventListener('popstate', updateCurrentLang);

    originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState!.apply(this, args);
      updateCurrentLang();
    };
  });

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    window.removeEventListener('popstate', updateCurrentLang);
    if (originalPushState) {
      history.pushState = originalPushState;
    }
  });

  const setBannerIndex = (index: number) => {
    if (!shouldShowBanner.value) {
      return;
    }
    if (index >= 0 && index < banners.value.length) {
      currentBannerIndex.value = index;
    }
  };

  const trackBannerClick = (banner: Banner) => {
    console.log('Banner clicked:', banner.title);
  };

  return {
    banners,
    currentBanner,
    currentBannerIndex,
    rotateBanner,
    setBannerIndex,
    trackBannerClick,
    shouldShowBanner,
  };
}

const getCurrentLang = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const path = window.location.pathname;
  if (path.startsWith('/ko/')) {
    return 'ko';
  }

  if (path.startsWith('/zh_hans/')) {
    return 'zh-hans';
  }

  if (path.startsWith('/ja/')) {
    return 'ja';
  }

  return 'en';
};
