import { computed, onMounted, ref } from 'vue';
import { type Banner, BANNER_DATA } from '../data/bannerData';

export function useBanner() {
  const banners = ref<Banner[]>(BANNER_DATA);

  const currentBannerIndex = ref(0);

  const currentBanner = computed(() => {
    return banners.value[currentBannerIndex.value];
  });

  const rotationInterval = 30000;

  const rotateBanner = () => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.value.length;
  };

  const getRandomBannerIndex = () => {
    return Math.floor(Math.random() * banners.value.length);
  };

  onMounted(() => {
    // 초기에 랜덤한 배너 표시
    currentBannerIndex.value = getRandomBannerIndex();

    // 일정 시간 간격으로 배너 로테이션
    const intervalId = setInterval(rotateBanner, rotationInterval);

    return () => {
      clearInterval(intervalId);
    };
  });

  const setBannerIndex = (index: number) => {
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
  };
}
