/**
 * The keys of every member of `T`.
 *
 * Unlike `keyof T`, which for a union only yields the keys shared by all
 * members, this distributes over each member, so a key that exists on some
 * members is included.
 */
export type KeysOfUnion<T> = T extends unknown ? keyof T : never;
