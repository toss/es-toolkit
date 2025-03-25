import { computed, onMounted, ref } from 'vue';
import { type Banner, EN_BANNER_DATA, KO_BANNER_DATA } from '../data/bannerData';

export function useBanner() {
  const currentLang = ref<string | null>(null);
  const banners = computed<Banner[]>(() => {
    if (currentLang.value === 'ko') {
      return KO_BANNER_DATA;
    }
    if (currentLang.value === 'en') {
      return EN_BANNER_DATA;
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

  onMounted(() => {
    // 현재 언어 설정
    currentLang.value = getCurrentLang();

    if (!shouldShowBanner.value) {
      return;
    }

    // 초기에 랜덤한 배너 표시
    currentBannerIndex.value = getRandomBannerIndex();

    // 일정 시간 간격으로 배너 로테이션
    const intervalId = setInterval(rotateBanner, rotationInterval);

    return () => {
      clearInterval(intervalId);
    };
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
  if (path.startsWith('/zh_hans/') || path.startsWith('/ja/')) {
    return null;
  }
  return 'en';
};
