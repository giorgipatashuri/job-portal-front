import * as React from "react";

export const Logo: React.FC = () => (
  <div className="flex gap-2 my-auto w-40">
    <div className="flex overflow-hidden relative flex-col my-auto w-8 aspect-square">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/8a6567b419d341d08d8c77ee83b53571/2e6209588ccd319d127ed639e6530711a718bae982a31e9decad132f16db5cb4?apiKey=8a6567b419d341d08d8c77ee83b53571&"
        className="object-cover absolute inset-0 size-full"
        alt=""
      />
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/8a6567b419d341d08d8c77ee83b53571/3054d378b3259fc556dbfa8957c04020eb8eb9d906687059de95a5913616abf7?apiKey=8a6567b419d341d08d8c77ee83b53571&"
        className="object-contain w-full aspect-square"
        alt=""
      />
    </div>
    <div className="text-2xl font-bold tracking-tight basis-auto text-slate-800">
      JobHuntly
    </div>
  </div>
);
