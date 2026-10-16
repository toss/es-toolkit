/**
 * 유니온의 각 멤버에서 지정한 키를 제거하고 나머지 속성을 유지해요.
 * 기본 `Omit`과 달리 각 멤버에만 있는 속성도 유지해요.
 * 존재하지 않는 키는 무시하고, `readonly`와 선택적 속성은 그대로 유지해요.
 *
 * @template T - 속성을 제거할 타입.
 * @template K - 제거할 키.
 *
 * @example
 * type Card = { kind: 'card'; cardNo: string; note: string };
 * type Bank = { kind: 'bank'; accountNo: string; note: string };
 * type Payment = DistributiveOmit<Card | Bank, 'note'>;
 * // => { kind: 'card'; cardNo: string } | { kind: 'bank'; accountNo: string }
 */
export type DistributiveOmit<T, K> = T extends unknown ? Pick<T, Exclude<keyof T, K>> : never;
