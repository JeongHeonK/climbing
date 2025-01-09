interface SpaceDivProps {
  vertical?: number;
  horizontal?: number;
}

export function SpaceDiv({ vertical, horizontal }: SpaceDivProps) {
  return <div className={`mb-${vertical ?? 0} mr-${horizontal ?? 0}`} />;
}
