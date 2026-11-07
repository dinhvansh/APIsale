// Price snapshot: https://apipass.dev/app/pricing (2026-11-05).
const PRICE_RULES = {
  "apipass/image-watermaker-remove": {
    channel: "regular",
    rules: [{ rule_id: "0b32c2ca-c3b8-4cc2-9312-9b589f5e4261", conditions: {}, credit_cost: 4, cost_unit: "per run", usd_price: 0.018182 }],
  },
  "bytedance/omni-human-1-5": {
    channel: "regular",
    rules: [{ rule_id: "43b04092-16aa-45da-bc57-4852fcc60d1d", conditions: {}, credit_cost: 37, cost_unit: "per second", usd_price: 0.168182 }],
  },
  "bytedance/seedance-2": {
    channel: "regular",
    rules: [
      {
        rule_id: "080ada58-06c2-46ab-8713-c9672695b52c",
        conditions: { resolution: "480p", reference_video_urls: { $empty: true } },
        credit_cost: 24.5,
        cost_unit: "per second",
        usd_price: 0.111364,
      },
      {
        rule_id: "d58fc01a-faec-4e30-9f5d-99d47bee62b7",
        conditions: { resolution: "480p", reference_video_urls: { $not_empty: true } },
        credit_cost: 13.5,
        cost_unit: "per second",
        usd_price: 0.061364,
      },
      {
        rule_id: "20b38639-261e-4871-b9af-c9c28adb9e94",
        conditions: { resolution: "720p", reference_video_urls: { $empty: true } },
        credit_cost: 52,
        cost_unit: "per second",
        usd_price: 0.236364,
      },
      {
        rule_id: "44074ace-a859-44c9-a0c1-8beb02e49757",
        conditions: { resolution: "720p", reference_video_urls: { $not_empty: true } },
        credit_cost: 32,
        cost_unit: "per second",
        usd_price: 0.145455,
      },
      {
        rule_id: "7c93d435-4654-4b1a-ace6-d9c16999cede",
        conditions: { resolution: "1080p", reference_video_urls: { $empty: true } },
        credit_cost: 122,
        cost_unit: "per second",
        usd_price: 0.554545,
      },
      {
        rule_id: "d3a35c21-33de-4de9-a410-73e7ac78ce86",
        conditions: { resolution: "1080p", reference_video_urls: { $not_empty: true } },
        credit_cost: 78,
        cost_unit: "per second",
        usd_price: 0.354545,
      },
      {
        rule_id: "8109b9aa-9a0a-45c8-80f0-eb73f5d8fa5a",
        conditions: { resolution: "4K", reference_video_urls: { $empty: true } },
        credit_cost: 240,
        cost_unit: "per second",
        usd_price: 1.090909,
      },
    ],
  },
  "bytedance/seedance-2-5": {
    channel: "regular",
    rules: [
      {
        rule_id: "8fbd8d25-3794-4040-931f-bcf782ffa726",
        conditions: { resolution: "1080p", reference_video_urls: { $not_empty: true } },
        credit_cost: 80,
        cost_unit: "per second",
        usd_price: 0.363636,
      },
      {
        rule_id: "27772341-c5b5-48c0-a0aa-1a13258b9436",
        conditions: { resolution: "1080p", reference_video_urls: { $empty: true } },
        credit_cost: 135,
        cost_unit: "per second",
        usd_price: 0.613636,
      },
      {
        rule_id: "a581c2a5-7a8d-4e21-bc8f-8f3c79264d46",
        conditions: { resolution: "720p", reference_video_urls: { $not_empty: true } },
        credit_cost: 44,
        cost_unit: "per second",
        usd_price: 0.2,
      },
      {
        rule_id: "d9019640-f522-45d6-94b1-8980f6718007",
        conditions: { resolution: "720p", reference_video_urls: { $empty: true } },
        credit_cost: 75,
        cost_unit: "per second",
        usd_price: 0.340909,
      },
      {
        rule_id: "5ac427f6-5f89-4b57-bca2-48a6249a6bdf",
        conditions: { resolution: "480p", reference_video_urls: { $not_empty: true } },
        credit_cost: 22,
        cost_unit: "per second",
        usd_price: 0.1,
      },
      {
        rule_id: "fbd4cf18-4e33-4dca-a505-15071efa24a0",
        conditions: { resolution: "480p", reference_video_urls: { $empty: true } },
        credit_cost: 35,
        cost_unit: "per second",
        usd_price: 0.159091,
      },
    ],
  },
  "bytedance/seedance-2-fast": {
    channel: "regular",
    rules: [
      {
        rule_id: "015cc512-23d4-46e4-9ba0-9c1bfdd67d1a",
        conditions: { resolution: "480p", reference_video_urls: { $empty: true } },
        credit_cost: 17.6,
        cost_unit: "per second",
        usd_price: 0.08,
      },
      {
        rule_id: "be3fb1be-7684-4487-9eb7-d0658df9e27e",
        conditions: { resolution: "480p", reference_video_urls: { $not_empty: true } },
        credit_cost: 11,
        cost_unit: "per second",
        usd_price: 0.05,
      },
      {
        rule_id: "918fe51e-859b-4fe0-a049-42c8ad00e7d4",
        conditions: { resolution: "720p", reference_video_urls: { $empty: true } },
        credit_cost: 28,
        cost_unit: "per second",
        usd_price: 0.127273,
      },
      {
        rule_id: "a18c4603-2707-4b63-8397-d21638b643df",
        conditions: { resolution: "720p", reference_video_urls: { $not_empty: true } },
        credit_cost: 20,
        cost_unit: "per second",
        usd_price: 0.090909,
      },
    ],
  },
  "bytedance/seedance-2-mini": {
    channel: "regular",
    rules: [
      {
        rule_id: "86198cf0-28c3-4f80-9ac5-688805637741",
        conditions: { resolution: "480p", reference_video_urls: { $empty: true } },
        credit_cost: 11,
        cost_unit: "per second",
        usd_price: 0.05,
      },
      {
        rule_id: "12c0e78f-c4ca-457e-bb9b-d24246aea5f2",
        conditions: { resolution: "480p", reference_video_urls: { $not_empty: true } },
        credit_cost: 7,
        cost_unit: "per second",
        usd_price: 0.031818,
      },
      {
        rule_id: "5e5f2db8-d322-4ef3-a5ae-087276901328",
        conditions: { resolution: "720p", reference_video_urls: { $empty: true } },
        credit_cost: 12,
        cost_unit: "per second",
        usd_price: 0.054545,
      },
      {
        rule_id: "098bd607-103e-4ed4-9797-216ea3ae6d87",
        conditions: { resolution: "720p", reference_video_urls: { $not_empty: true } },
        credit_cost: 8,
        cost_unit: "per second",
        usd_price: 0.036364,
      },
    ],
  },
  "bytedance/seedream-4.5": {
    channel: "regular",
    rules: [
      { rule_id: "70aeff4f-2a42-4a6e-a978-7b67b4cc6107", conditions: {}, credit_cost: 8, cost_unit: "per image", usd_price: 0.036364 },
      { rule_id: "1af78cb6-7426-4916-8af0-f21baa22abc3", conditions: {}, credit_cost: 8, cost_unit: "per image", usd_price: 0.036364 },
    ],
  },
  "bytedance/seedream-v4": {
    channel: "regular",
    rules: [
      { rule_id: "b1458d15-d150-433f-83cc-536d39a7ee89", conditions: { max_images: 1 }, credit_cost: 6, cost_unit: "per run", usd_price: 0.027273 },
      { rule_id: "a3a4cbee-409f-4779-b835-6155f4d9ef7c", conditions: { max_images: 2 }, credit_cost: 12, cost_unit: "per run", usd_price: 0.054545 },
      { rule_id: "4fc41905-5538-4b7c-853d-046381171b5f", conditions: { max_images: 3 }, credit_cost: 18, cost_unit: "per run", usd_price: 0.081818 },
      { rule_id: "f4bce5cf-f1bc-498a-995b-42b44ef2b4f3", conditions: { max_images: 4 }, credit_cost: 24, cost_unit: "per run", usd_price: 0.109091 },
      { rule_id: "99b37e26-b299-41d1-b4d6-f483861ee093", conditions: { max_images: 5 }, credit_cost: 30, cost_unit: "per run", usd_price: 0.136364 },
      { rule_id: "9b84f0b7-2f4f-43dc-b44b-39284efa8002", conditions: { max_images: 6 }, credit_cost: 36, cost_unit: "per run", usd_price: 0.163636 },
    ],
  },
  "create-rvc-dataset": {
    channel: "official",
    rules: [{ rule_id: "aba1a46c-989d-4199-bd84-7d460da43048", conditions: {}, credit_cost: 14, cost_unit: "per run", usd_price: 0.063636 }],
  },
  "elevenlabs/elevenlabs-v3-tts": {
    channel: "regular",
    rules: [{ rule_id: "16dda7f7-f26b-40ab-a0b5-35f2d3a3c71f", conditions: {}, credit_cost: 18, cost_unit: "per prompt/1000", usd_price: 0.081818 }],
  },
  "flux-3-klein": {
    channel: "regular",
    rules: [
      {
        rule_id: "1bf0eeee-dd8f-49f3-93ab-10d47fa5b0af",
        conditions: { n: 1, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 2.079,
        cost_unit: "per run",
        usd_price: 0.00945,
      },
      {
        rule_id: "35b1c220-b09f-443b-80b9-2563c9cde68f",
        conditions: { n: 2, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 4.158,
        cost_unit: "per run",
        usd_price: 0.0189,
      },
      {
        rule_id: "d4909fb7-f420-4745-8240-750801992578",
        conditions: { n: 3, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 6.237,
        cost_unit: "per run",
        usd_price: 0.02835,
      },
      {
        rule_id: "4e8e456a-2df1-46c7-9ff5-12e4188f5fdb",
        conditions: { n: 4, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 8.316,
        cost_unit: "per run",
        usd_price: 0.0378,
      },
      {
        rule_id: "6696b3d8-0ce9-49f4-a4da-e05fd3c8c3f6",
        conditions: { n: 1, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 3.234,
        cost_unit: "per run",
        usd_price: 0.0147,
      },
      {
        rule_id: "7876ea5b-8e1b-489a-a628-528f0a2279b1",
        conditions: { n: 2, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 6.468,
        cost_unit: "per run",
        usd_price: 0.0294,
      },
      {
        rule_id: "bf2334a2-afae-4d99-9978-cae01933175b",
        conditions: { n: 3, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 9.702,
        cost_unit: "per run",
        usd_price: 0.0441,
      },
      {
        rule_id: "965d2716-48d3-4725-9b0d-09bbb1107169",
        conditions: { n: 4, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 12.936,
        cost_unit: "per run",
        usd_price: 0.0588,
      },
      {
        rule_id: "90463d4c-78a4-40fb-a7c5-84f758f6d68b",
        conditions: { n: 1, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 8.317,
        cost_unit: "per run",
        usd_price: 0.037805,
      },
      {
        rule_id: "eb3e5dde-da9e-43f1-84d6-cb53d7807d12",
        conditions: { n: 2, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 16.634,
        cost_unit: "per run",
        usd_price: 0.075609,
      },
      {
        rule_id: "ca53e70c-29bd-46ba-ac54-81619103d76e",
        conditions: { n: 3, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 24.951,
        cost_unit: "per run",
        usd_price: 0.113414,
      },
      {
        rule_id: "e071dec2-9bc7-4e0a-b0fb-091da5763a7b",
        conditions: { n: 4, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 33.268,
        cost_unit: "per run",
        usd_price: 0.151218,
      },
    ],
  },
  "flux-3-klein-edit": {
    channel: "regular",
    rules: [
      {
        rule_id: "01f44f49-e267-4979-811f-159ce2f2d91e",
        conditions: { n: 1, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 2.079,
        cost_unit: "per run",
        usd_price: 0.00945,
      },
      {
        rule_id: "7353492d-2b3a-4d32-afab-9e540ead6925",
        conditions: { n: 2, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 4.158,
        cost_unit: "per run",
        usd_price: 0.0189,
      },
      {
        rule_id: "a0300a1d-7070-42d3-8ad1-52ac26469afd",
        conditions: { n: 3, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 6.237,
        cost_unit: "per run",
        usd_price: 0.02835,
      },
      {
        rule_id: "b29717f1-32da-4a2e-871a-784e439bf836",
        conditions: { n: 4, resolution: { $in: ["1K", "1k"] } },
        credit_cost: 8.316,
        cost_unit: "per run",
        usd_price: 0.0378,
      },
      {
        rule_id: "14a1561c-f048-42fa-bb86-d17370d85718",
        conditions: { n: 1, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 3.234,
        cost_unit: "per run",
        usd_price: 0.0147,
      },
      {
        rule_id: "65d7b04f-f9f9-47f4-b2b6-e2f75bb8f835",
        conditions: { n: 2, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 6.468,
        cost_unit: "per run",
        usd_price: 0.0294,
      },
      {
        rule_id: "7124d7ab-d3e6-4060-a7d6-332b6c78c198",
        conditions: { n: 3, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 9.702,
        cost_unit: "per run",
        usd_price: 0.0441,
      },
      {
        rule_id: "f4a5eefd-406d-42a5-b6fc-11fe9eb30207",
        conditions: { n: 4, resolution: { $in: ["2K", "2k"] } },
        credit_cost: 12.936,
        cost_unit: "per run",
        usd_price: 0.0588,
      },
      {
        rule_id: "f60e7a6f-76eb-4fdd-a6fb-5ec4a77ff6eb",
        conditions: { n: 1, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 8.317,
        cost_unit: "per run",
        usd_price: 0.037805,
      },
      {
        rule_id: "bc613e1f-a55c-418f-b191-8d3ca373c77c",
        conditions: { n: 2, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 16.634,
        cost_unit: "per run",
        usd_price: 0.075609,
      },
      {
        rule_id: "4bd5b144-fb47-4b6e-8096-c7ce7fee48b8",
        conditions: { n: 3, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 24.951,
        cost_unit: "per run",
        usd_price: 0.113414,
      },
      {
        rule_id: "6b32ec69-00d6-4d0c-94ae-0ee64e75edd2",
        conditions: { n: 4, resolution: { $in: ["4K", "4k"] } },
        credit_cost: 33.268,
        cost_unit: "per run",
        usd_price: 0.151218,
      },
    ],
  },
  "flux-3-max/image-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "7c74989d-7c83-474c-b521-0d13c969c1cc",
        conditions: { resolution: { $in: ["720p", "720P"] } },
        credit_cost: 39.27,
        cost_unit: "per second",
        usd_price: 0.1785,
      },
      {
        rule_id: "198cec82-f1c5-4249-8d54-830f500a07da",
        conditions: { resolution: { $in: ["1080p", "1080P"] } },
        credit_cost: 67,
        cost_unit: "per second",
        usd_price: 0.304545,
      },
    ],
  },
  "flux-3-max/keyframes-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "4dd4088e-666d-4e67-8cb3-901ebe938ba0",
        conditions: { resolution: { $in: ["720p", "720P"] } },
        credit_cost: 39.27,
        cost_unit: "per second",
        usd_price: 0.1785,
      },
      {
        rule_id: "d975f93d-0354-4491-b705-36ce2f032cef",
        conditions: { resolution: { $in: ["1080p", "1080P"] } },
        credit_cost: 67,
        cost_unit: "per second",
        usd_price: 0.304545,
      },
    ],
  },
  "flux-3-max/text-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "70275cbe-7e5b-49a8-8e24-dd3662331936",
        conditions: { resolution: { $in: ["720p", "720P"] } },
        credit_cost: 39.27,
        cost_unit: "per second",
        usd_price: 0.1785,
      },
      {
        rule_id: "51b11976-0075-4d10-8875-4662217f3b52",
        conditions: { resolution: { $in: ["1080p", "1080P"] } },
        credit_cost: 67,
        cost_unit: "per second",
        usd_price: 0.304545,
      },
    ],
  },
  "flux/flux-pro-image-2": {
    channel: "regular",
    rules: [
      { rule_id: "c46e90f8-4ed2-4e22-b932-20b6fa454d9a", conditions: { resolution: "2K" }, credit_cost: 9, cost_unit: "per run", usd_price: 0.040909 },
      { rule_id: "409c0206-d5d3-49c2-8366-ffcf209e56c7", conditions: { resolution: "1K" }, credit_cost: 6, cost_unit: "per run", usd_price: 0.027273 },
    ],
  },
  "google/gemini-omni-audio": {
    channel: "regular",
    rules: [{ rule_id: "c8f043a2-9b95-42d6-96d3-c62b6b644421", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "google/gemini-omni-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "4015c014-442d-4aa7-b439-de1e546f6faa",
        conditions: { duration: "4", resolution: "720p" },
        credit_cost: 102,
        cost_unit: "per run",
        usd_price: 0.463636,
      },
      {
        rule_id: "8b25d0c0-130b-4bc1-91bc-27df7a43d06b",
        conditions: { duration: "6", resolution: "720p" },
        credit_cost: 135,
        cost_unit: "per run",
        usd_price: 0.613636,
      },
      {
        rule_id: "5c055d84-12d6-470c-90ca-620bdded6161",
        conditions: { duration: "8", resolution: "720p" },
        credit_cost: 168,
        cost_unit: "per run",
        usd_price: 0.763636,
      },
      {
        rule_id: "9d81d4ce-c494-40d5-9c62-d69bf524517c",
        conditions: { duration: "10", resolution: "720p" },
        credit_cost: 200,
        cost_unit: "per run",
        usd_price: 0.909091,
      },
      {
        rule_id: "ad594e2e-2135-4edc-bae2-1c3ea674de27",
        conditions: { duration: "4", resolution: "1080p" },
        credit_cost: 103,
        cost_unit: "per run",
        usd_price: 0.468182,
      },
      {
        rule_id: "48da9255-9542-44d0-ae63-cccc00fae2b0",
        conditions: { duration: "6", resolution: "1080p" },
        credit_cost: 136,
        cost_unit: "per run",
        usd_price: 0.618182,
      },
      {
        rule_id: "c1d37489-537e-412a-8760-a8c8ba1e64c5",
        conditions: { duration: "4", resolution: "1080p" },
        credit_cost: 168,
        cost_unit: "per run",
        usd_price: 0.763636,
      },
      {
        rule_id: "6af0f86c-646c-4860-8b8a-fe8eb34a12a0",
        conditions: { duration: "10", resolution: "1080p" },
        credit_cost: 202,
        cost_unit: "per run",
        usd_price: 0.918182,
      },
      {
        rule_id: "e4bc0343-f6aa-4673-93a0-721fa34de3ae",
        conditions: { duration: "4", resolution: "4k" },
        credit_cost: 233,
        cost_unit: "per run",
        usd_price: 1.059091,
      },
      {
        rule_id: "258dc344-7d00-414b-bff1-f8dec5955072",
        conditions: { duration: "6", resolution: "4k" },
        credit_cost: 268,
        cost_unit: "per run",
        usd_price: 1.218182,
      },
      {
        rule_id: "165ce98e-c2fc-4004-8049-3b151ab05138",
        conditions: { duration: "8", resolution: "4k" },
        credit_cost: 300,
        cost_unit: "per run",
        usd_price: 1.363636,
      },
      {
        rule_id: "041e10b4-ce27-493a-a539-c84684ca5df1",
        conditions: { duration: "10", resolution: "4k" },
        credit_cost: 335,
        cost_unit: "per run",
        usd_price: 1.522727,
      },
      { rule_id: "313c415a-4080-4564-b7d2-0d828dba332f", conditions: { resolution: "720p" }, credit_cost: 268, cost_unit: "per run", usd_price: 1.218182 },
      { rule_id: "e16156eb-ed81-4400-8dfc-6e486e5c6bf5", conditions: { resolution: "1080p" }, credit_cost: 270, cost_unit: "per run", usd_price: 1.227273 },
      { rule_id: "8f094513-1410-49bb-baa3-037c1f159e54", conditions: { resolution: "4k" }, credit_cost: 400, cost_unit: "per run", usd_price: 1.818182 },
    ],
  },
  "google/nano-banana-2": {
    channel: "regular",
    rules: [
      { rule_id: "969dd78c-b322-4e9e-b080-0301ca762572", conditions: { resolution: "2K" }, credit_cost: 15, cost_unit: "per image", usd_price: 0.068182 },
      { rule_id: "ba127738-ecc6-454e-9cbf-96864f8cd870", conditions: { resolution: "1K" }, credit_cost: 10, cost_unit: "per image", usd_price: 0.045455 },
      { rule_id: "4fed3d17-3bb1-40fc-9907-35804068a731", conditions: { resolution: "4K" }, credit_cost: 22, cost_unit: "per image", usd_price: 0.1 },
    ],
  },
  "google/nano-banana-2-1": {
    channel: "regular",
    rules: [
      { rule_id: "3f73d046-3ff1-45a5-a602-d87213dba1e6", conditions: {}, credit_cost: 5, cost_unit: "per run", usd_price: 0.022727 },
      { rule_id: "a4040cf5-a1e8-49e3-b9ca-369ca638824e", conditions: { resolution: "1K" }, credit_cost: 5, cost_unit: "per run", usd_price: 0.022727 },
      { rule_id: "20810380-0200-4994-9254-bb7f60d2cd6f", conditions: { resolution: "2K" }, credit_cost: 7, cost_unit: "per run", usd_price: 0.031818 },
      { rule_id: "50617827-90aa-4f45-b7fa-6abefdaac8cc", conditions: { resolution: "4K" }, credit_cost: 11, cost_unit: "per run", usd_price: 0.05 },
    ],
  },
  "google/nano-banana-2-lite": {
    channel: "regular",
    rules: [{ rule_id: "b661b617-5f39-4744-ac72-8bd58a881549", conditions: {}, credit_cost: 5, cost_unit: "per run", usd_price: 0.022727 }],
  },
  "google/nano-banana-pro": {
    channel: "regular",
    rules: [
      { rule_id: "dd28f569-26e6-4c83-9362-a3e5c18acdaa", conditions: { resolution: "1K" }, credit_cost: 19, cost_unit: "per run", usd_price: 0.086364 },
      { rule_id: "19a52577-27dc-44e5-b979-c8d779772707", conditions: { resolution: "2K" }, credit_cost: 20, cost_unit: "per run", usd_price: 0.090909 },
      { rule_id: "ffe7ac49-4a02-4daa-bdcf-d80274557518", conditions: { resolution: "4K" }, credit_cost: 38, cost_unit: "per run", usd_price: 0.172727 },
    ],
  },
  "google/veo-3": {
    channel: "official",
    rules: [
      {
        rule_id: "4fc5978a-492b-494e-972c-53d1faca9752",
        conditions: { duration: 8, resolution: "1080p", generate_audio: true },
        credit_cost: 743,
        cost_unit: "per video",
        usd_price: 3.377273,
      },
      {
        rule_id: "115f3c32-bb3f-405a-b022-84fd0eb12cd9",
        conditions: { duration: 8, resolution: "1080p", generate_audio: false },
        credit_cost: 373,
        cost_unit: "per video",
        usd_price: 1.695455,
      },
      {
        rule_id: "10077c3c-0726-49fe-ae4e-0ddef127a079",
        conditions: { duration: 6, resolution: "1080p", generate_audio: true },
        credit_cost: 558,
        cost_unit: "per video",
        usd_price: 2.536364,
      },
      {
        rule_id: "4173da23-62ad-43e6-a9d7-756c74b72714",
        conditions: { duration: 6, resolution: "1080p", generate_audio: false },
        credit_cost: 281,
        cost_unit: "per video",
        usd_price: 1.277273,
      },
      {
        rule_id: "21faac0a-0982-4d40-ae40-f9364a831963",
        conditions: { duration: 4, resolution: "1080p", generate_audio: true },
        credit_cost: 373,
        cost_unit: "per video",
        usd_price: 1.695455,
      },
      {
        rule_id: "6d584418-0e1d-4a46-95ef-f6496bff5db2",
        conditions: { duration: 4, resolution: "1080p", generate_audio: false },
        credit_cost: 188,
        cost_unit: "per video",
        usd_price: 0.854545,
      },
      {
        rule_id: "9808dcb1-9dcb-4750-8ebd-68ed524afc19",
        conditions: { duration: 8, resolution: "720p", generate_audio: true },
        credit_cost: 743,
        cost_unit: "per video",
        usd_price: 3.377273,
      },
      {
        rule_id: "6e268dbb-575c-4a3d-bb4f-a747713bf369",
        conditions: { duration: 8, resolution: "720p", generate_audio: false },
        credit_cost: 373,
        cost_unit: "per video",
        usd_price: 1.695455,
      },
      {
        rule_id: "4c0381b1-0f87-4479-8f4b-d09a92242e51",
        conditions: { duration: 6, resolution: "720p", generate_audio: true },
        credit_cost: 558,
        cost_unit: "per video",
        usd_price: 2.536364,
      },
      {
        rule_id: "c167b3be-e2df-47c6-808c-547749dce99d",
        conditions: { duration: 6, resolution: "720p", generate_audio: false },
        credit_cost: 281,
        cost_unit: "per video",
        usd_price: 1.277273,
      },
      {
        rule_id: "fff28481-273d-4de9-bf65-5830c8cbbe2c",
        conditions: { duration: 4, resolution: "720p", generate_audio: true },
        credit_cost: 373,
        cost_unit: "per video",
        usd_price: 1.695455,
      },
      {
        rule_id: "2279529e-da0b-4b7d-9343-2bad892434a9",
        conditions: { duration: 4, resolution: "720p", generate_audio: false },
        credit_cost: 188,
        cost_unit: "per video",
        usd_price: 0.854545,
      },
    ],
  },
  "google/veo-3-1-extend": {
    channel: "regular",
    rules: [
      { rule_id: "d2d33614-9ca2-47d9-8633-8cab8122d878", conditions: { model: "fast" }, credit_cost: 70, cost_unit: "per run", usd_price: 0.318182 },
      { rule_id: "3be28a92-34c2-4f35-b5aa-a34ad2b8adfb", conditions: { model: "quality" }, credit_cost: 280, cost_unit: "per run", usd_price: 1.272727 },
      { rule_id: "ef7a3b0e-bc78-449d-8d19-aca3b57b0b39", conditions: { model: "lite" }, credit_cost: 35, cost_unit: "per run", usd_price: 0.159091 },
    ],
  },
  "google/veo-3-1-fast": {
    channel: "regular",
    rules: [
      { rule_id: "69884893-d3b8-412a-8f0e-6e261f85d1da", conditions: { resolution: "4k" }, credit_cost: 210, cost_unit: "per run", usd_price: 0.954545 },
      { rule_id: "e0b88436-e638-4ae5-a8cc-ee7ad5bbb060", conditions: { resolution: "4k" }, credit_cost: 210, cost_unit: "per run", usd_price: 0.954545 },
      { rule_id: "8e4493fb-187e-4fc7-ab75-1719b90f419f", conditions: { resolution: "1080p" }, credit_cost: 80, cost_unit: "per run", usd_price: 0.363636 },
      { rule_id: "142413ca-b4f6-4c1b-b20e-1af4fa99d77b", conditions: { resolution: "1080p" }, credit_cost: 80, cost_unit: "per run", usd_price: 0.363636 },
      { rule_id: "cdf799ab-3fbe-4633-baf4-14fd2a4622f3", conditions: { resolution: "720p" }, credit_cost: 75, cost_unit: "per run", usd_price: 0.340909 },
      { rule_id: "9560e3d4-09a6-4b9b-a9b3-cbe5b836aaed", conditions: { resolution: "720p" }, credit_cost: 75, cost_unit: "per run", usd_price: 0.340909 },
    ],
  },
  "google/veo-3-1-get-1080p-video": {
    channel: "regular",
    rules: [{ rule_id: "434a5b0b-e32d-4948-8119-759ed1299665", conditions: {}, credit_cost: 6.2, cost_unit: "per run", usd_price: 0.028182 }],
  },
  "google/veo-3-1-get-4k-video": {
    channel: "regular",
    rules: [{ rule_id: "67b131dd-c756-43b7-a6ab-33b525268cf6", conditions: {}, credit_cost: 138, cost_unit: "per run", usd_price: 0.627273 }],
  },
  "google/veo-3-1-lite": {
    channel: "regular",
    rules: [
      { rule_id: "f36dd7a9-3d19-49b6-8118-1dc4d2a091a6", conditions: { resolution: "4k" }, credit_cost: 170, cost_unit: "per run", usd_price: 0.772727 },
      { rule_id: "18b17dc2-645f-4502-b8af-08545097f527", conditions: { resolution: "4k" }, credit_cost: 170, cost_unit: "per run", usd_price: 0.772727 },
      { rule_id: "3a5c7fb0-d4a2-4f3e-81b5-bddeb9b9922a", conditions: { resolution: "1080p" }, credit_cost: 40, cost_unit: "per run", usd_price: 0.181818 },
      { rule_id: "8a254e1b-cff2-47b6-8d8a-b44ac76348b9", conditions: { resolution: "1080p" }, credit_cost: 40, cost_unit: "per run", usd_price: 0.181818 },
      { rule_id: "9e467115-3ed6-409c-945b-6348de3f6a24", conditions: { resolution: "720p" }, credit_cost: 35, cost_unit: "per run", usd_price: 0.159091 },
      { rule_id: "3e2ad582-e468-45ac-a74a-0e6dde0e4ee4", conditions: { resolution: "720p" }, credit_cost: 35, cost_unit: "per run", usd_price: 0.159091 },
    ],
  },
  "google/veo-3-1-quality": {
    channel: "regular",
    rules: [
      { rule_id: "7613aafd-e54d-4da8-90ab-b2d15cb1a69e", conditions: { resolution: "4k" }, credit_cost: 420, cost_unit: "per run", usd_price: 1.909091 },
      { rule_id: "7322d121-aba1-4d99-9e45-4f5ecf7bb5a1", conditions: { resolution: "4k" }, credit_cost: 420, cost_unit: "per run", usd_price: 1.909091 },
      { rule_id: "77f3fab5-ef64-41f1-91e2-200caa87780e", conditions: { resolution: "1080p" }, credit_cost: 290, cost_unit: "per run", usd_price: 1.318182 },
      { rule_id: "1ef3ed7e-5676-47dc-92ba-6f05d37adc84", conditions: { resolution: "1080p" }, credit_cost: 290, cost_unit: "per run", usd_price: 1.318182 },
      { rule_id: "642042ab-8583-4e92-a683-1af1e238c398", conditions: { resolution: "720p" }, credit_cost: 280, cost_unit: "per run", usd_price: 1.272727 },
      { rule_id: "0dcd7fb9-1dba-45f5-958c-1eb613fba38a", conditions: { resolution: "720p" }, credit_cost: 280, cost_unit: "per run", usd_price: 1.272727 },
    ],
  },
  "google/veo-3-fast": {
    channel: "official",
    rules: [
      {
        rule_id: "ad111692-eebd-4602-932e-340bfedaacd7",
        conditions: { duration: 8, resolution: "1080p", generate_audio: true },
        credit_cost: 281,
        cost_unit: "per video",
        usd_price: 1.277273,
      },
      {
        rule_id: "8a6c1cc7-217e-4d5a-a03b-5911c53c055b",
        conditions: { duration: 8, resolution: "1080p", generate_audio: false },
        credit_cost: 188,
        cost_unit: "per video",
        usd_price: 0.854545,
      },
      {
        rule_id: "c9b7a92c-6a2a-44df-a0bd-1e7bb5bfc70a",
        conditions: { duration: 6, resolution: "1080p", generate_audio: true },
        credit_cost: 211,
        cost_unit: "per video",
        usd_price: 0.959091,
      },
      {
        rule_id: "f72892d1-151f-4d0c-a2db-73060ef43c6f",
        conditions: { duration: 6, resolution: "1080p", generate_audio: false },
        credit_cost: 142,
        cost_unit: "per video",
        usd_price: 0.645455,
      },
      {
        rule_id: "1be59315-e01c-4d6a-af8b-b7ae3c442d12",
        conditions: { duration: 4, resolution: "1080p", generate_audio: true },
        credit_cost: 142,
        cost_unit: "per video",
        usd_price: 0.645455,
      },
      {
        rule_id: "37fb4b5e-ff8f-4d0e-80ec-62f1a587facb",
        conditions: { duration: 4, resolution: "1080p", generate_audio: false },
        credit_cost: 96,
        cost_unit: "per video",
        usd_price: 0.436364,
      },
      {
        rule_id: "14edf09d-c3cc-4f24-9963-21d0bac3c888",
        conditions: { duration: 8, resolution: "720p", generate_audio: true },
        credit_cost: 281,
        cost_unit: "per video",
        usd_price: 1.277273,
      },
      {
        rule_id: "fa0e6139-b726-4ffc-bd71-2b3f518b92b4",
        conditions: { duration: 8, resolution: "720p", generate_audio: false },
        credit_cost: 188,
        cost_unit: "per video",
        usd_price: 0.854545,
      },
      {
        rule_id: "dc5ea3a3-03a9-4f87-98b0-eda7fdf999e3",
        conditions: { duration: 6, resolution: "720p", generate_audio: true },
        credit_cost: 211,
        cost_unit: "per video",
        usd_price: 0.959091,
      },
      {
        rule_id: "776ea897-5527-40f7-a73d-cc771845ce0f",
        conditions: { duration: 6, resolution: "720p", generate_audio: false },
        credit_cost: 142,
        cost_unit: "per video",
        usd_price: 0.645455,
      },
      {
        rule_id: "8e49c925-7772-46d4-a168-0b04305e24ab",
        conditions: { duration: 4, resolution: "720p", generate_audio: true },
        credit_cost: 142,
        cost_unit: "per video",
        usd_price: 0.645455,
      },
      {
        rule_id: "7d120289-f49b-4d65-96e3-86776a839daa",
        conditions: { duration: 4, resolution: "720p", generate_audio: false },
        credit_cost: 96,
        cost_unit: "per video",
        usd_price: 0.436364,
      },
    ],
  },
  "grok-imagine-video-1-5-preview": {
    channel: "regular",
    rules: [
      { rule_id: "515cebe6-a05e-4232-acb4-e458c30e1756", conditions: { resolution: "480p" }, credit_cost: 17, cost_unit: "per second", usd_price: 0.077273 },
      { rule_id: "007f1399-8ada-46ad-8c63-a652be8312cf", conditions: { resolution: "720p" }, credit_cost: 28, cost_unit: "per second", usd_price: 0.127273 },
    ],
  },
  "grok-imagine/image-to-image": {
    channel: "regular",
    rules: [{ rule_id: "6a870833-76ac-4734-9d5b-86b5ea5b7faf", conditions: {}, credit_cost: 4.620462, cost_unit: "per run", usd_price: 0.021002 }],
  },
  "grok-imagine/image-to-video": {
    channel: "regular",
    rules: [
      { rule_id: "3cb3474a-8881-4dda-b3e8-527f6a4358fc", conditions: { resolution: "480p" }, credit_cost: 3, cost_unit: "per second", usd_price: 0.013636 },
      { rule_id: "4b8dee3e-0dcf-415f-a1ad-0bfc10e81a02", conditions: { resolution: "720p" }, credit_cost: 5.5, cost_unit: "per second", usd_price: 0.025 },
      { rule_id: "a3702c63-5d46-4b4a-9092-a733ab5a34c8", conditions: { resolution: "1080p" }, credit_cost: 9.5, cost_unit: "per second", usd_price: 0.043182 },
    ],
  },
  "grok-imagine/text-to-image": {
    channel: "regular",
    rules: [
      { rule_id: "2dc7a0f0-e98e-4ccf-b8e5-0b04ebcd8be5", conditions: { enable_pro: false }, credit_cost: 4.5, cost_unit: "per run", usd_price: 0.020455 },
      { rule_id: "d0bbfc19-31d0-4b17-bdf4-9a92c85a62a2", conditions: { enable_pro: true }, credit_cost: 6, cost_unit: "per run", usd_price: 0.027273 },
    ],
  },
  "grok-imagine/text-to-video": {
    channel: "regular",
    rules: [
      { rule_id: "87405649-47a0-4107-aa63-c5ff0ac5f90f", conditions: { resolution: "480p" }, credit_cost: 2, cost_unit: "per second", usd_price: 0.009091 },
      { rule_id: "a3f53236-b75a-464e-a427-5e101b529633", conditions: { resolution: "720p" }, credit_cost: 7, cost_unit: "per second", usd_price: 0.031818 },
    ],
  },
  "grok-imagine/upscale": {
    channel: "regular",
    rules: [{ rule_id: "e3d85235-a905-4972-8691-d5ccdbeb2fe4", conditions: {}, credit_cost: 12, cost_unit: "per run", usd_price: 0.054545 }],
  },
  "ideogram/vector-1.0/image-to-vector": {
    channel: "regular",
    rules: [{ rule_id: "59330810-2f05-4d66-9587-a0c09be66f03", conditions: {}, credit_cost: 24, cost_unit: "per image", usd_price: 0.109091 }],
  },
  "ideogram/vector-1.0/text-to-vector": {
    channel: "regular",
    rules: [
      { rule_id: "af22622c-42bf-458f-9df1-1fb821607881", conditions: {}, credit_cost: 37, cost_unit: "per image", usd_price: 0.168182 },
      { rule_id: "f72b01a4-7aed-42a0-b395-91cc8fd00d86", conditions: { quality: "high" }, credit_cost: 47, cost_unit: "per image", usd_price: 0.213636 },
      { rule_id: "7b515473-8c14-456d-9124-8d5fcd4b31a3", conditions: { quality: "medium" }, credit_cost: 37, cost_unit: "per image", usd_price: 0.168182 },
      { rule_id: "fc96c720-1463-46c3-bc0d-ce5f3a2c2c54", conditions: { quality: "low" }, credit_cost: 31, cost_unit: "per image", usd_price: 0.140909 },
      { rule_id: "3f81cef4-9d55-4229-b80c-9a57b6024f8f", conditions: { n: 8, quality: "high" }, credit_cost: 376, cost_unit: "per run", usd_price: 1.709091 },
      { rule_id: "7118854c-6d82-4de0-a03e-1cfa8e85a540", conditions: { n: 7, quality: "high" }, credit_cost: 329, cost_unit: "per run", usd_price: 1.495455 },
      { rule_id: "9dfc7bb2-bb08-4fbe-b3f9-67dad0ccb29b", conditions: { n: 6, quality: "high" }, credit_cost: 282, cost_unit: "per run", usd_price: 1.281818 },
      { rule_id: "c0be0889-4a34-41b9-bcd6-4acf24616fe3", conditions: { n: 5, quality: "high" }, credit_cost: 235, cost_unit: "per run", usd_price: 1.068182 },
      { rule_id: "0be224f1-08b2-49b0-8ac1-08f27980e90d", conditions: { n: 4, quality: "high" }, credit_cost: 188, cost_unit: "per run", usd_price: 0.854545 },
      { rule_id: "3b52081f-9900-4b92-a1af-09a6b33de151", conditions: { n: 3, quality: "high" }, credit_cost: 141, cost_unit: "per run", usd_price: 0.640909 },
      { rule_id: "3602a210-a758-43d8-854a-f9608cb92c42", conditions: { n: 2, quality: "high" }, credit_cost: 94, cost_unit: "per run", usd_price: 0.427273 },
      { rule_id: "b4408d0a-4b96-4e4a-ad9c-b6c5b482b8cd", conditions: { n: 8, quality: "medium" }, credit_cost: 296, cost_unit: "per run", usd_price: 1.345455 },
      { rule_id: "e66d6f3d-3420-4041-8900-053ca8fb2f23", conditions: { n: 7, quality: "medium" }, credit_cost: 259, cost_unit: "per run", usd_price: 1.177273 },
      { rule_id: "5d8c3d90-6ecb-4bba-968b-7a789e81858b", conditions: { n: 6, quality: "medium" }, credit_cost: 222, cost_unit: "per run", usd_price: 1.009091 },
      { rule_id: "b6c76456-d502-481f-b6e2-0c9adebd6612", conditions: { n: 5, quality: "medium" }, credit_cost: 185, cost_unit: "per run", usd_price: 0.840909 },
      { rule_id: "e8cfd5a4-8dd7-4782-a2b1-5441391cb3d0", conditions: { n: 4, quality: "medium" }, credit_cost: 148, cost_unit: "per run", usd_price: 0.672727 },
      { rule_id: "42501f65-0457-467e-a5a5-a0485cee00c3", conditions: { n: 3, quality: "medium" }, credit_cost: 111, cost_unit: "per run", usd_price: 0.504545 },
      { rule_id: "3bd9498f-bd43-40a0-a276-3dd55fdd8b86", conditions: { n: 2, quality: "medium" }, credit_cost: 74, cost_unit: "per run", usd_price: 0.336364 },
      { rule_id: "6019c64b-1a05-4f49-ba8c-5c3e2564dfda", conditions: { n: 8, quality: "low" }, credit_cost: 248, cost_unit: "per run", usd_price: 1.127273 },
      { rule_id: "324b7f32-6674-4fc0-9ad9-4f97360cb662", conditions: { n: 7, quality: "low" }, credit_cost: 217, cost_unit: "per run", usd_price: 0.986364 },
      { rule_id: "b7cf2d9b-e3cd-406c-a8e6-33552e8bbd64", conditions: { n: 6, quality: "low" }, credit_cost: 186, cost_unit: "per run", usd_price: 0.845455 },
      { rule_id: "a7e60b07-9f5d-4fe6-aabd-b646bbe15f1f", conditions: { n: 5, quality: "low" }, credit_cost: 155, cost_unit: "per run", usd_price: 0.704545 },
      { rule_id: "7b81cab5-a7fb-4b79-a85d-13845ce65344", conditions: { n: 4, quality: "low" }, credit_cost: 124, cost_unit: "per run", usd_price: 0.563636 },
      { rule_id: "cc2ef1ff-9576-4d7c-bf14-31bdc2de8867", conditions: { n: 3, quality: "low" }, credit_cost: 93, cost_unit: "per run", usd_price: 0.422727 },
      { rule_id: "4a3cda7f-fb1b-4d8a-a71f-62916e5b4e86", conditions: { n: 2, quality: "low" }, credit_cost: 62, cost_unit: "per run", usd_price: 0.281818 },
      {
        rule_id: "f3bee159-b7a0-44e8-bbb9-7e0a6e430419",
        conditions: { quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 74,
        cost_unit: "per image",
        usd_price: 0.336364,
      },
      {
        rule_id: "1efac542-aa75-4085-bc10-f6963db51629",
        conditions: { images: { $not_empty: true }, quality: "high" },
        credit_cost: 74,
        cost_unit: "per image",
        usd_price: 0.336364,
      },
      {
        rule_id: "b626e6bc-862d-4299-b126-d7790cd49552",
        conditions: { quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 74,
        cost_unit: "per image",
        usd_price: 0.336364,
      },
      {
        rule_id: "f1af50e5-b413-415b-b598-b4bb96652e1d",
        conditions: { n: 8, quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 592,
        cost_unit: "per run",
        usd_price: 2.690909,
      },
      {
        rule_id: "b2f8ac74-4191-4d19-952a-50f35e9e5cc8",
        conditions: { n: 8, images: { $not_empty: true }, quality: "high" },
        credit_cost: 592,
        cost_unit: "per run",
        usd_price: 2.690909,
      },
      {
        rule_id: "5031a845-047c-4abd-b566-f432c6f4ec65",
        conditions: { n: 8, quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 592,
        cost_unit: "per run",
        usd_price: 2.690909,
      },
      {
        rule_id: "15c767bc-db12-4548-894b-9da39262a9b2",
        conditions: { n: 7, quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 518,
        cost_unit: "per run",
        usd_price: 2.354545,
      },
      {
        rule_id: "1eff99eb-a26d-40d3-943b-656200823277",
        conditions: { n: 7, images: { $not_empty: true }, quality: "high" },
        credit_cost: 518,
        cost_unit: "per run",
        usd_price: 2.354545,
      },
      {
        rule_id: "3cb77663-dca1-42b0-9f87-10fbe30b40ea",
        conditions: { n: 7, quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 518,
        cost_unit: "per run",
        usd_price: 2.354545,
      },
      {
        rule_id: "4940d6cb-07c3-4b65-abe7-71d5c6f42d98",
        conditions: { n: 6, quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 444,
        cost_unit: "per run",
        usd_price: 2.018182,
      },
      {
        rule_id: "8e19d474-fb94-4a55-bf6c-f242a9ea5fb8",
        conditions: { n: 6, images: { $not_empty: true }, quality: "high" },
        credit_cost: 444,
        cost_unit: "per run",
        usd_price: 2.018182,
      },
      {
        rule_id: "4a26e9f3-8d0c-482d-8591-f419e4864478",
        conditions: { n: 6, quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 444,
        cost_unit: "per run",
        usd_price: 2.018182,
      },
      {
        rule_id: "624e0f20-11dc-4330-9e72-004ba04455f3",
        conditions: { n: 5, quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 370,
        cost_unit: "per run",
        usd_price: 1.681818,
      },
      {
        rule_id: "9dab0e52-a404-4f07-ae2b-e73396e99f33",
        conditions: { n: 5, images: { $not_empty: true }, quality: "high" },
        credit_cost: 370,
        cost_unit: "per run",
        usd_price: 1.681818,
      },
      {
        rule_id: "c03ac42c-4d71-4f17-9e74-858b65828be8",
        conditions: { n: 5, quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 370,
        cost_unit: "per run",
        usd_price: 1.681818,
      },
      {
        rule_id: "ecb67280-a910-4b9b-bd76-e0573de9b5f7",
        conditions: { n: 4, quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 296,
        cost_unit: "per run",
        usd_price: 1.345455,
      },
      {
        rule_id: "c57cb158-c5a1-4a10-9c7c-26c98a613b6b",
        conditions: { n: 4, images: { $not_empty: true }, quality: "high" },
        credit_cost: 296,
        cost_unit: "per run",
        usd_price: 1.345455,
      },
      {
        rule_id: "dce779c2-9b37-4d62-99bd-d2444c068fd3",
        conditions: { n: 4, quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 296,
        cost_unit: "per run",
        usd_price: 1.345455,
      },
      {
        rule_id: "810c1093-eccb-425b-9bce-21eb2b81c106",
        conditions: { n: 3, quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 222,
        cost_unit: "per run",
        usd_price: 1.009091,
      },
      {
        rule_id: "8d80f8b4-adcb-46af-a958-b532fac503cf",
        conditions: { n: 3, images: { $not_empty: true }, quality: "high" },
        credit_cost: 222,
        cost_unit: "per run",
        usd_price: 1.009091,
      },
      {
        rule_id: "0d9e43b9-61bb-407d-834b-8d5a2a012399",
        conditions: { n: 3, quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 222,
        cost_unit: "per run",
        usd_price: 1.009091,
      },
      {
        rule_id: "843a7917-2f03-4134-9543-121e1c4b6fd6",
        conditions: { n: 2, quality: "high", image_urls: { $not_empty: true } },
        credit_cost: 148,
        cost_unit: "per run",
        usd_price: 0.672727,
      },
      {
        rule_id: "c6d4b490-518e-4004-9cf4-703d2c89daef",
        conditions: { n: 2, images: { $not_empty: true }, quality: "high" },
        credit_cost: 148,
        cost_unit: "per run",
        usd_price: 0.672727,
      },
      {
        rule_id: "2d55c1af-4826-4d3e-8678-b9c95cc3d709",
        conditions: { n: 2, quality: "high", reference_image_urls: { $not_empty: true } },
        credit_cost: 148,
        cost_unit: "per run",
        usd_price: 0.672727,
      },
    ],
  },
  "kling-4.0/keyframe-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "5306007c-c656-4668-b0f8-645bb346ffed",
        conditions: { resolution: { $exists: false } },
        credit_cost: 32.92,
        cost_unit: "per second",
        usd_price: 0.149636,
      },
      {
        rule_id: "cd0d3b7b-e456-432f-9262-bd929f2f17fa",
        conditions: { resolution: "1080p" },
        credit_cost: 49.09,
        cost_unit: "per second",
        usd_price: 0.223136,
      },
      { rule_id: "49974fba-d9e9-4405-9e36-cbd34dad707b", conditions: { resolution: "720p" }, credit_cost: 32.92, cost_unit: "per second", usd_price: 0.149636 },
      {
        rule_id: "31bf99d4-084b-46ff-8083-3c2ad33d4bd5",
        conditions: { duration: { $exists: false }, resolution: { $exists: false } },
        credit_cost: 164.6,
        cost_unit: "per run",
        usd_price: 0.748182,
      },
      {
        rule_id: "29468a61-ca9e-4bee-a72e-f74692ac374f",
        conditions: { duration: { $exists: false }, resolution: "1080p" },
        credit_cost: 245.45,
        cost_unit: "per run",
        usd_price: 1.115682,
      },
      {
        rule_id: "50641ca3-6c94-4dd6-a626-7411f668487a",
        conditions: { duration: { $exists: false }, resolution: "720p" },
        credit_cost: 164.6,
        cost_unit: "per run",
        usd_price: 0.748182,
      },
    ],
  },
  "kling-4.0/reference-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "493416d7-ddb2-4af8-8879-e401d22d9914",
        conditions: { resolution: { $exists: false } },
        credit_cost: 32.92,
        cost_unit: "per second",
        usd_price: 0.149636,
      },
      {
        rule_id: "2347886b-d443-4e42-9b81-ec7d5c53e5a5",
        conditions: { resolution: "1080p" },
        credit_cost: 51.54,
        cost_unit: "per second",
        usd_price: 0.234273,
      },
      { rule_id: "b8b0c686-3909-41ce-a1ff-25baeed4f1c9", conditions: { resolution: "720p" }, credit_cost: 34.57, cost_unit: "per second", usd_price: 0.157136 },
      {
        rule_id: "10382bda-8402-460d-99e0-fb96b10cba85",
        conditions: { duration: { $exists: false }, resolution: { $exists: false } },
        credit_cost: 164.6,
        cost_unit: "per run",
        usd_price: 0.748182,
      },
      {
        rule_id: "d9d00e85-857c-4304-87f7-dc7746b70e82",
        conditions: { duration: { $exists: false }, resolution: "1080p" },
        credit_cost: 245.45,
        cost_unit: "per run",
        usd_price: 1.115682,
      },
      {
        rule_id: "c69dec9a-46d2-41fa-9d42-adf7578052a0",
        conditions: { duration: { $exists: false }, resolution: "720p" },
        credit_cost: 164.6,
        cost_unit: "per run",
        usd_price: 0.748182,
      },
      {
        rule_id: "182028a1-8b57-4929-96bd-79768b1a47be",
        conditions: { resolution: "1080p", video_urls: { $not_empty: true } },
        credit_cost: 30.93,
        cost_unit: "per second",
        usd_price: 0.140591,
      },
      {
        rule_id: "2e733668-8bcc-4090-9eb0-2513f8651904",
        conditions: { resolution: "720p", video_urls: { $not_empty: true } },
        credit_cost: 20.62,
        cost_unit: "per second",
        usd_price: 0.093727,
      },
    ],
  },
  "kling/avatar-v2": {
    channel: "official",
    rules: [
      { rule_id: "c1e658ba-6ea4-4687-9a79-d06b05376ef6", conditions: { mode: "pro" }, credit_cost: 25.41, cost_unit: "per second", usd_price: 0.1155 },
      { rule_id: "0568eb58-3fb0-4066-9e19-026e3317cc2c", conditions: { mode: "std" }, credit_cost: 13, cost_unit: "per second", usd_price: 0.059091 },
    ],
  },
  "kling/kling-2-6": {
    channel: "regular",
    rules: [
      {
        rule_id: "887e5efd-2d48-40ce-b18d-eb06abde6aee",
        conditions: { duration: "10", generate_audio: true },
        credit_cost: 220,
        cost_unit: "per run",
        usd_price: 1,
      },
      {
        rule_id: "7debf500-3ce3-4421-ad89-938227b28673",
        conditions: { duration: "10", generate_audio: false },
        credit_cost: 115,
        cost_unit: "per run",
        usd_price: 0.522727,
      },
      {
        rule_id: "5e37a02e-bab9-4b63-b45f-37e91de26a17",
        conditions: { duration: "5", generate_audio: true },
        credit_cost: 110,
        cost_unit: "per run",
        usd_price: 0.5,
      },
      {
        rule_id: "2f150f2d-3611-4c81-85ee-ab0c50494992",
        conditions: { duration: "5", generate_audio: false },
        credit_cost: 65,
        cost_unit: "per run",
        usd_price: 0.295455,
      },
    ],
  },
  "kling/kling-2-6-motion-control": {
    channel: "regular",
    rules: [
      { rule_id: "cf8de03a-734a-4d24-be95-07eba8eac522", conditions: { mode: "std" }, credit_cost: 14, cost_unit: "per second", usd_price: 0.063636 },
      { rule_id: "a707f05c-61ab-41a9-94c5-bcb22945e4ed", conditions: { mode: "pro" }, credit_cost: 20, cost_unit: "per second", usd_price: 0.090909 },
    ],
  },
  "kling/kling-3.0-omni": {
    channel: "regular",
    rules: [
      {
        rule_id: "c9c82850-2c69-41c5-99c0-9f39cbb3a93f",
        conditions: { resolution: "4k", video_urls: { $not_empty: true } },
        credit_cost: 75,
        cost_unit: "per second",
        usd_price: 0.340909,
      },
      {
        rule_id: "c0bf4e5d-13c6-45fc-8f8d-8d49dec02e46",
        conditions: { resolution: "1080p", video_urls: { $not_empty: true } },
        credit_cost: 30,
        cost_unit: "per second",
        usd_price: 0.136364,
      },
      {
        rule_id: "5d2edc31-ae69-4d48-9e53-b930067f4dc2",
        conditions: { resolution: "720p", video_urls: { $not_empty: true } },
        credit_cost: 23.5,
        cost_unit: "per second",
        usd_price: 0.106818,
      },
      {
        rule_id: "90657cef-4c71-4b17-9389-3db3a1f03674",
        conditions: { audio: { $not_empty: true }, resolution: "4k" },
        credit_cost: 75,
        cost_unit: "per second",
        usd_price: 0.340909,
      },
      {
        rule_id: "eac667ce-cdb8-4a41-acfd-79825f610b6e",
        conditions: { audio: { $empty: true }, resolution: "4k" },
        credit_cost: 75,
        cost_unit: "per second",
        usd_price: 0.340909,
      },
      {
        rule_id: "bb1bb9d6-9870-4df0-895a-980596671993",
        conditions: { audio: { $not_empty: true }, resolution: "1080p" },
        credit_cost: 27,
        cost_unit: "per second",
        usd_price: 0.122727,
      },
      {
        rule_id: "e763e4c3-79a7-4e90-9f2c-0b98b8af306e",
        conditions: { audio: { $not_empty: true }, resolution: "1080p" },
        credit_cost: 22,
        cost_unit: "per second",
        usd_price: 0.1,
      },
      {
        rule_id: "7c60b313-0ce2-4a62-b315-064a86f2eb9b",
        conditions: { audio: { $not_empty: true }, resolution: "720p" },
        credit_cost: 22,
        cost_unit: "per second",
        usd_price: 0.1,
      },
      {
        rule_id: "839c99dc-3140-4cbb-8ea4-78f8750afe58",
        conditions: { audio: { $empty: true }, resolution: "720p" },
        credit_cost: 18,
        cost_unit: "per second",
        usd_price: 0.081818,
      },
      {
        rule_id: "72596c94-1b5b-4db1-a08a-815f5b9eb6a4",
        conditions: { audio: { $not_empty: true }, resolution: "4k" },
        credit_cost: 75,
        cost_unit: "per second",
        usd_price: 0.340909,
      },
      {
        rule_id: "312d32ad-c9d9-4205-801c-fc70fae94178",
        conditions: { audio: { $empty: true }, resolution: "4k" },
        credit_cost: 75,
        cost_unit: "per second",
        usd_price: 0.340909,
      },
      {
        rule_id: "a6b8f0e8-78f8-40a1-92cd-522d17375bf1",
        conditions: { audio: { $not_empty: true }, resolution: "1080p" },
        credit_cost: 27,
        cost_unit: "per second",
        usd_price: 0.122727,
      },
      {
        rule_id: "b2452895-e9e8-4569-a252-ec2b79cda2ec",
        conditions: { audio: { $not_empty: true }, resolution: "1080p" },
        credit_cost: 22,
        cost_unit: "per second",
        usd_price: 0.1,
      },
      {
        rule_id: "efb306fc-457f-4fc4-8bef-5768240ed9f7",
        conditions: { audio: { $not_empty: true }, resolution: "720p" },
        credit_cost: 22,
        cost_unit: "per second",
        usd_price: 0.1,
      },
      {
        rule_id: "6d342319-3602-4544-944d-63dcb27b9d94",
        conditions: { audio: { $empty: true }, resolution: "720p" },
        credit_cost: 18,
        cost_unit: "per second",
        usd_price: 0.081818,
      },
    ],
  },
  "kling/kling-v3-motion-control": {
    channel: "regular",
    rules: [
      { rule_id: "15e1ff19-38be-4f42-bd13-6e85e98f44be", conditions: { mode: "720p" }, credit_cost: 24, cost_unit: "per second", usd_price: 0.109091 },
      { rule_id: "acb57136-a00e-40b7-87b0-0b584c02aad0", conditions: { mode: "1080p" }, credit_cost: 32, cost_unit: "per second", usd_price: 0.145455 },
    ],
  },
  "kling/kling-v3-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "6841aba2-9a8b-46c7-b2bb-7d8564b80d3e",
        conditions: { mode: "standard", generate_audio: false },
        credit_cost: 19,
        cost_unit: "per second",
        usd_price: 0.086364,
      },
      {
        rule_id: "a1144639-8179-4a32-9b78-90d41f65fbd1",
        conditions: { mode: "standard", generate_audio: true },
        credit_cost: 28,
        cost_unit: "per second",
        usd_price: 0.127273,
      },
      {
        rule_id: "afc3aa2b-bbba-4d75-9560-bb269fcf636b",
        conditions: { mode: "pro", generate_audio: false },
        credit_cost: 26,
        cost_unit: "per second",
        usd_price: 0.118182,
      },
      {
        rule_id: "706af5a7-0cbe-41e7-a7af-94dbe98285bc",
        conditions: { mode: "pro", generate_audio: true },
        credit_cost: 38,
        cost_unit: "per second",
        usd_price: 0.172727,
      },
    ],
  },
  "luma/photon": {
    channel: "official",
    rules: [{ rule_id: "243082ac-6a34-4378-b3c0-d82904b2cfa8", conditions: {}, credit_cost: 4, cost_unit: "per run", usd_price: 0.018182 }],
  },
  "luma/photon-flash": {
    channel: "official",
    rules: [{ rule_id: "c5fd548d-7ba3-4702-8695-cb80add1bccb", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "luma/photon-flash-modify": {
    channel: "official",
    rules: [{ rule_id: "ad93ff79-c1d2-4fb2-b106-b1a62c848385", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "luma/photon-modify": {
    channel: "official",
    rules: [{ rule_id: "f5d7820b-0da8-480f-bae2-256a9fcf26d0", conditions: {}, credit_cost: 4, cost_unit: "per image", usd_price: 0.018182 }],
  },
  "luma/ray-3-2-i2v": {
    channel: "official",
    rules: [{ rule_id: "ddc4c8d3-00a2-48e6-9c6d-f9fca575ebc8", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "luma/ray-3-2-t2v": {
    channel: "official",
    rules: [{ rule_id: "e1abb2da-250e-427f-96e9-5ad15458b74f", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "luma/ray-3-2-v2v-edit": {
    channel: "official",
    rules: [{ rule_id: "2d935ec2-03ac-429c-8923-c4a7427c6f73", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "luma/ray-3-2-v2v-reframing": {
    channel: "official",
    rules: [{ rule_id: "b30ecda3-4f13-439a-ab9f-3d079a36f03d", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "minimax/hailuo-2-3": {
    channel: "regular",
    rules: [
      {
        rule_id: "7035ea33-9d11-4b4b-b63e-d61029b7ecb0",
        conditions: { duration: 10, resolution: "1080p" },
        credit_cost: 100,
        cost_unit: "per video",
        usd_price: 0.454545,
      },
      {
        rule_id: "e88ff3ae-f40e-4f75-bd66-6ae5b7f2602a",
        conditions: { duration: 6, resolution: "1080p" },
        credit_cost: 54,
        cost_unit: "per video",
        usd_price: 0.245455,
      },
      {
        rule_id: "cd57dbdf-2055-4e54-b29a-7fbb7c2277ec",
        conditions: { duration: 10, resolution: "768p" },
        credit_cost: 62,
        cost_unit: "per video",
        usd_price: 0.281818,
      },
      {
        rule_id: "7747062f-fedb-4202-a6cb-394e4578e86d",
        conditions: { duration: 6, resolution: "768p" },
        credit_cost: 30,
        cost_unit: "per video",
        usd_price: 0.136364,
      },
    ],
  },
  "minimax/hailuo-h3": {
    channel: "regular",
    rules: [
      { rule_id: "96f45e64-f1a9-42fd-868f-225efb5223d2", conditions: { resolution: "768P" }, credit_cost: 19, cost_unit: "per second", usd_price: 0.086364 },
      { rule_id: "9c3951d5-1edb-4d84-b08d-388e3c1f0a11", conditions: { resolution: "768P" }, credit_cost: 19, cost_unit: "per second", usd_price: 0.086364 },
      { rule_id: "d6a23fe6-33d5-4828-bb4b-5307f9fa1396", conditions: { resolution: "768P" }, credit_cost: 19, cost_unit: "per second", usd_price: 0.086364 },
      { rule_id: "4fcfc71b-2aa6-4446-8bd2-7a5fc5eb009d", conditions: { resolution: "768P" }, credit_cost: 19, cost_unit: "per second", usd_price: 0.086364 },
      { rule_id: "06f32303-21eb-4c1a-b656-62a47ef16635", conditions: { resolution: "2K" }, credit_cost: 29, cost_unit: "per second", usd_price: 0.131818 },
      { rule_id: "29b2938b-9079-4ff8-ac0c-bbb3f35eb3c9", conditions: { resolution: "2K" }, credit_cost: 29, cost_unit: "per second", usd_price: 0.131818 },
    ],
  },
  "minimax/music-1-5": {
    channel: "official",
    rules: [{ rule_id: "f7c0a9d3-03e4-4199-8dee-2b89bb072021", conditions: {}, credit_cost: 7, cost_unit: "per audio", usd_price: 0.031818 }],
  },
  "omnihuman-2-0": {
    channel: "regular",
    rules: [{ rule_id: "c297430d-9467-4f26-93a8-1c1694fcedae", conditions: {}, credit_cost: 16.17, cost_unit: "per second", usd_price: 0.0735 }],
  },
  "openai/gpt-image-2": {
    channel: "regular",
    rules: [
      {
        rule_id: "fc024d95-5681-4de4-85d5-6cdb697b0159",
        conditions: { images: { $empty: true }, quality: "low", resolution: "1k" },
        credit_cost: 3.2,
        cost_unit: "per run",
        usd_price: 0.014545,
      },
      {
        rule_id: "986812d8-9715-465b-923c-71b8c1d539a1",
        conditions: { images: { $not_empty: true }, quality: "low", resolution: "1k" },
        credit_cost: 4.5,
        cost_unit: "per run",
        usd_price: 0.020455,
      },
      {
        rule_id: "d6726a3c-c345-4716-be2d-ab9078b9affd",
        conditions: { images: { $empty: true }, quality: "medium", resolution: "1k" },
        credit_cost: 10,
        cost_unit: "per run",
        usd_price: 0.045455,
      },
      {
        rule_id: "38821a6f-8355-44cf-b07f-7d541b343437",
        conditions: { images: { $not_empty: true }, quality: "medium", resolution: "1k" },
        credit_cost: 10,
        cost_unit: "per run",
        usd_price: 0.045455,
      },
      {
        rule_id: "87754906-824f-4483-85cd-8a2b5a8052ed",
        conditions: { images: { $empty: true }, quality: "high", resolution: "1k" },
        credit_cost: 42,
        cost_unit: "per run",
        usd_price: 0.190909,
      },
      {
        rule_id: "546c8761-f05a-446e-bebb-8feb5c07e041",
        conditions: { images: { $not_empty: true }, quality: "high", resolution: "1k" },
        credit_cost: 42,
        cost_unit: "per run",
        usd_price: 0.190909,
      },
      {
        rule_id: "499dcd16-fa6a-45bd-a6d4-e6a69ff66060",
        conditions: { images: { $empty: true }, quality: "low", resolution: "2k" },
        credit_cost: 5,
        cost_unit: "per run",
        usd_price: 0.022727,
      },
      {
        rule_id: "5fc73aa0-9da9-4aad-a6fe-b0ebcd8ff7f5",
        conditions: { images: { $not_empty: true }, quality: "low", resolution: "2k" },
        credit_cost: 8,
        cost_unit: "per run",
        usd_price: 0.036364,
      },
      {
        rule_id: "b748af7d-cbae-4e24-9df3-5c4b7796c305",
        conditions: { images: { $empty: true }, quality: "medium", resolution: "2k" },
        credit_cost: 13.5,
        cost_unit: "per run",
        usd_price: 0.061364,
      },
      {
        rule_id: "6bb43913-7e55-4ba1-8e8f-a23eba234c0a",
        conditions: { images: { $not_empty: true }, quality: "medium", resolution: "2k" },
        credit_cost: 17.5,
        cost_unit: "per run",
        usd_price: 0.079545,
      },
      {
        rule_id: "c88358d7-bc4a-4aab-8fe5-e6eeb55fd184",
        conditions: { images: { $empty: true }, quality: "high", resolution: "2k" },
        credit_cost: 44,
        cost_unit: "per run",
        usd_price: 0.2,
      },
      {
        rule_id: "8de2e851-6d01-4c8d-8faf-919b075a0280",
        conditions: { images: { $not_empty: true }, quality: "high", resolution: "2k" },
        credit_cost: 48.48,
        cost_unit: "per run",
        usd_price: 0.220364,
      },
      {
        rule_id: "ff227deb-0bc9-472c-8401-2bc0a87d3eed",
        conditions: { images: { $empty: true }, quality: "low", resolution: "4k" },
        credit_cost: 9,
        cost_unit: "per run",
        usd_price: 0.040909,
      },
      {
        rule_id: "6eeafc3d-4a60-4b5f-9a21-23ff13d00dee",
        conditions: { images: { $not_empty: true }, quality: "low", resolution: "4k" },
        credit_cost: 13,
        cost_unit: "per run",
        usd_price: 0.059091,
      },
      {
        rule_id: "f47afca5-e4d9-4577-ae2e-07cbfb6d95ca",
        conditions: { images: { $empty: true }, quality: "medium", resolution: "4k" },
        credit_cost: 22,
        cost_unit: "per run",
        usd_price: 0.1,
      },
      {
        rule_id: "7dae7f02-1dd7-4a26-b01c-c277fd090c25",
        conditions: { images: { $not_empty: true }, quality: "medium", resolution: "4k" },
        credit_cost: 24,
        cost_unit: "per run",
        usd_price: 0.109091,
      },
      {
        rule_id: "135f8c54-8885-4de4-8e26-d46bd0db40ea",
        conditions: { images: { $empty: true }, quality: "high", resolution: "4k" },
        credit_cost: 75,
        cost_unit: "per run",
        usd_price: 0.340909,
      },
      {
        rule_id: "1c589fd0-afeb-4200-b548-bb7c3bc2edc0",
        conditions: { images: { $not_empty: true }, quality: "high", resolution: "4k" },
        credit_cost: 77,
        cost_unit: "per run",
        usd_price: 0.35,
      },
    ],
  },
  "openai/gpt-image-2.5": {
    channel: "regular",
    rules: [
      {
        rule_id: "8cecc19c-e5ea-47a0-9035-2940630b0a3d",
        conditions: { resolution: { $in: ["4k", "4K"] } },
        credit_cost: 18.5,
        cost_unit: "per image",
        usd_price: 0.084091,
      },
      {
        rule_id: "6b30d08a-7c46-47f0-a1e5-e77b7efac988",
        conditions: { resolution: { $in: ["2k", "2K"] } },
        credit_cost: 11.6,
        cost_unit: "per image",
        usd_price: 0.052727,
      },
      {
        rule_id: "c10bbecf-6b17-4018-a087-bfc6e22e3348",
        conditions: { resolution: { $in: ["1k", "1K"] } },
        credit_cost: 7,
        cost_unit: "per image",
        usd_price: 0.031818,
      },
    ],
  },
  "openai/gpt-image-2.5-flare": {
    channel: "regular",
    rules: [
      {
        rule_id: "3e7ea638-cd97-4652-9902-7bbf00f77464",
        conditions: { resolution: { $in: ["4k", "4K"] } },
        credit_cost: 18.5,
        cost_unit: "per image",
        usd_price: 0.084091,
      },
      {
        rule_id: "98f9fe41-068f-4407-8cbe-9343fbc2e6f3",
        conditions: { resolution: { $in: ["2k", "2K"] } },
        credit_cost: 11.6,
        cost_unit: "per image",
        usd_price: 0.052727,
      },
      {
        rule_id: "f6e781c9-75a1-4306-a227-7348751e3959",
        conditions: { resolution: { $in: ["1k", "1K"] } },
        credit_cost: 7,
        cost_unit: "per image",
        usd_price: 0.031818,
      },
    ],
  },
  "openai/gpt-image-2.5-sunburst": {
    channel: "regular",
    rules: [
      {
        rule_id: "927ea4df-c642-4d90-a52b-3f67d907354a",
        conditions: { resolution: { $in: ["4k", "4K"] } },
        credit_cost: 18.5,
        cost_unit: "per image",
        usd_price: 0.084091,
      },
      {
        rule_id: "d7a19ab5-d814-4a8e-a07d-385cb9f395ce",
        conditions: { resolution: { $in: ["2k", "2K"] } },
        credit_cost: 11.6,
        cost_unit: "per image",
        usd_price: 0.052727,
      },
      {
        rule_id: "db4c8252-815a-424e-b883-4e399f7a5560",
        conditions: { resolution: { $in: ["1k", "1K"] } },
        credit_cost: 7,
        cost_unit: "per image",
        usd_price: 0.031818,
      },
    ],
  },
  "openai/gpt-image-2.6-flare": {
    channel: "regular",
    rules: [{ rule_id: "2e05e3d3-346c-47cc-9d68-14bd039d213b", conditions: {}, credit_cost: 18.5, cost_unit: "per image", usd_price: 0.084091 }],
  },
  "openai/gpt-image-2.6-sunburst": {
    channel: "regular",
    rules: [{ rule_id: "c4ed4a35-3907-44ad-ae33-dd47a6eb46f5", conditions: {}, credit_cost: 18.5, cost_unit: "per image", usd_price: 0.084091 }],
  },
  "pixverse-v6-max/image-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "a6bfc686-3753-4252-b82b-8d2fa5722c92",
        conditions: { quality: "360p", generate_audio_switch: { $exists: false } },
        credit_cost: 5.544,
        cost_unit: "per second",
        usd_price: 0.0252,
      },
      {
        rule_id: "865256dc-7464-40da-8ce0-933a7401f239",
        conditions: { quality: "540p", generate_audio_switch: { $exists: false } },
        credit_cost: 8.316,
        cost_unit: "per second",
        usd_price: 0.0378,
      },
      {
        rule_id: "d19bbd1f-d1e6-458a-9e50-fae710027c59",
        conditions: { quality: "720p", generate_audio_switch: { $exists: false } },
        credit_cost: 10.164,
        cost_unit: "per second",
        usd_price: 0.0462,
      },
      {
        rule_id: "311fd548-1776-41ca-ab85-c8d72a5e131c",
        conditions: { quality: "1080p", generate_audio_switch: { $exists: false } },
        credit_cost: 20.328,
        cost_unit: "per second",
        usd_price: 0.0924,
      },
      {
        rule_id: "6cfc38e4-7356-4a7c-97a4-7892ec2c50b5",
        conditions: { quality: "360p", generate_audio_switch: false },
        credit_cost: 5.544,
        cost_unit: "per second",
        usd_price: 0.0252,
      },
      {
        rule_id: "663c2f9c-d446-4d22-b72e-1962204477cd",
        conditions: { quality: "540p", generate_audio_switch: false },
        credit_cost: 8.316,
        cost_unit: "per second",
        usd_price: 0.0378,
      },
      {
        rule_id: "d48b7651-4404-448c-96de-3312cd69eb2b",
        conditions: { quality: "720p", generate_audio_switch: false },
        credit_cost: 10.164,
        cost_unit: "per second",
        usd_price: 0.0462,
      },
      {
        rule_id: "4f7d8705-4ae6-4194-ae78-a04d9d2d85ae",
        conditions: { quality: "1080p", generate_audio_switch: false },
        credit_cost: 20.328,
        cost_unit: "per second",
        usd_price: 0.0924,
      },
      {
        rule_id: "5489864b-331b-4c1a-b932-5240ea9a5ff0",
        conditions: { quality: "360p", generate_audio_switch: true },
        credit_cost: 8.316,
        cost_unit: "per second",
        usd_price: 0.0378,
      },
      {
        rule_id: "f17ff867-a5a8-4782-912c-7559c12207e1",
        conditions: { quality: "540p", generate_audio_switch: true },
        credit_cost: 10.164,
        cost_unit: "per second",
        usd_price: 0.0462,
      },
      {
        rule_id: "434fe3fa-b0ec-47bd-84ed-b45440e68c87",
        conditions: { quality: "720p", generate_audio_switch: true },
        credit_cost: 13.86,
        cost_unit: "per second",
        usd_price: 0.063,
      },
      {
        rule_id: "1d894d59-0c16-4684-b3a7-7834290b05cd",
        conditions: { quality: "1080p", generate_audio_switch: true },
        credit_cost: 25.872,
        cost_unit: "per second",
        usd_price: 0.1176,
      },
    ],
  },
  "pixverse-v6-max/text-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "599b701f-4d2a-42f0-adaf-4693bf664eb5",
        conditions: { quality: "360p", generate_audio_switch: { $exists: false } },
        credit_cost: 5.544,
        cost_unit: "per second",
        usd_price: 0.0252,
      },
      {
        rule_id: "08882e1d-bf71-4133-89fe-e124ec60defa",
        conditions: { quality: "540p", generate_audio_switch: { $exists: false } },
        credit_cost: 8.316,
        cost_unit: "per second",
        usd_price: 0.0378,
      },
      {
        rule_id: "5f2cda97-842c-4821-8c79-6fc34b7a48ae",
        conditions: { quality: "720p", generate_audio_switch: { $exists: false } },
        credit_cost: 10.164,
        cost_unit: "per second",
        usd_price: 0.0462,
      },
      {
        rule_id: "0ef2d2e0-2720-40f6-b572-f990fca8a49c",
        conditions: { quality: "1080p", generate_audio_switch: { $exists: false } },
        credit_cost: 20.328,
        cost_unit: "per second",
        usd_price: 0.0924,
      },
      {
        rule_id: "8c4a24bc-6352-4db6-bf39-75487b594e80",
        conditions: { quality: "360p", generate_audio_switch: false },
        credit_cost: 5.544,
        cost_unit: "per second",
        usd_price: 0.0252,
      },
      {
        rule_id: "c5c4da12-1e7b-4141-99c1-8d394a76e563",
        conditions: { quality: "540p", generate_audio_switch: false },
        credit_cost: 8.316,
        cost_unit: "per second",
        usd_price: 0.0378,
      },
      {
        rule_id: "07e6db7f-0741-43bb-8650-f2bc6f265a2e",
        conditions: { quality: "720p", generate_audio_switch: false },
        credit_cost: 10.164,
        cost_unit: "per second",
        usd_price: 0.0462,
      },
      {
        rule_id: "5f3f510b-b069-4b29-8279-a551410108d5",
        conditions: { quality: "1080p", generate_audio_switch: false },
        credit_cost: 20.328,
        cost_unit: "per second",
        usd_price: 0.0924,
      },
      {
        rule_id: "70452c85-9071-4078-8166-31c7469f6e4f",
        conditions: { quality: "360p", generate_audio_switch: true },
        credit_cost: 8.316,
        cost_unit: "per second",
        usd_price: 0.0378,
      },
      {
        rule_id: "8df91852-fc6f-4dea-8d1d-34852e7002f1",
        conditions: { quality: "540p", generate_audio_switch: true },
        credit_cost: 10.164,
        cost_unit: "per second",
        usd_price: 0.0462,
      },
      {
        rule_id: "7f4a0595-3a91-412f-970a-2e7cb0f9cd44",
        conditions: { quality: "720p", generate_audio_switch: true },
        credit_cost: 13.86,
        cost_unit: "per second",
        usd_price: 0.063,
      },
      {
        rule_id: "32cb50fd-6a4c-43fc-a88d-90bccdc667f5",
        conditions: { quality: "1080p", generate_audio_switch: true },
        credit_cost: 25.872,
        cost_unit: "per second",
        usd_price: 0.1176,
      },
    ],
  },
  "qwen/qwen-image-2": {
    channel: "regular",
    rules: [{ rule_id: "15fc1d3e-49cb-473d-8e8d-b86d8e126a55", conditions: {}, credit_cost: 7, cost_unit: "per run", usd_price: 0.031818 }],
  },
  "qwen/qwen-image-2-1": {
    channel: "regular",
    rules: [{ rule_id: "d53ca161-e600-4c4a-bcf5-2f666d99a026", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  runway: {
    channel: "regular",
    rules: [{ rule_id: "f269f5c1-72d5-45d7-9afb-cf9ac89e6c88", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "seedream/seedream-5-lite-image": {
    channel: "regular",
    rules: [{ rule_id: "5d9210b1-c762-4a1b-b8c0-d8422936f37b", conditions: {}, credit_cost: 6.6, cost_unit: "per run", usd_price: 0.03 }],
  },
  "seedream/seedream-5-pro-image": {
    channel: "regular",
    rules: [{ rule_id: "2d4568c4-e6b7-4867-b383-74f82c49fa0f", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "split-music": {
    channel: "regular",
    rules: [{ rule_id: "866a7d80-f90c-42da-a61e-c540e65b316f", conditions: {}, credit_cost: 38, cost_unit: "per run", usd_price: 0.172727 }],
  },
  "suno/add-instrumental": {
    channel: "regular",
    rules: [{ rule_id: "1c24cf70-a680-4b5a-b708-01a10967fe2c", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/add-vocals": {
    channel: "regular",
    rules: [{ rule_id: "3527786c-9bd3-4774-9deb-d9cfb0de78cf", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/boost-style": {
    channel: "regular",
    rules: [{ rule_id: "fdef6202-ce71-43bb-a057-395e00598324", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/cover-generate": {
    channel: "regular",
    rules: [{ rule_id: "471e58dd-54cf-4874-ad6b-692d7678854f", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/download": {
    channel: "regular",
    rules: [{ rule_id: "bc21ae09-da74-4140-b92b-de556e54720b", conditions: {}, credit_cost: 5, cost_unit: "per run", usd_price: 0.022727 }],
  },
  "suno/extend": {
    channel: "regular",
    rules: [{ rule_id: "c93babad-71f1-43af-b05a-492ddb2e4041", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/generate": {
    channel: "regular",
    rules: [{ rule_id: "2fb06fe7-d0b9-406f-b553-203ee0f20a8c", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/generate-agent": {
    channel: "regular",
    rules: [{ rule_id: "3a4ab8c9-fae4-488b-a2bc-7389a9600da6", conditions: {}, credit_cost: 45, cost_unit: "per run", usd_price: 0.204545 }],
  },
  "suno/lyrics": {
    channel: "regular",
    rules: [{ rule_id: "db13c5f7-7e3d-49d9-ae90-55a6537c6663", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/mashup": {
    channel: "regular",
    rules: [{ rule_id: "8b6e997a-d240-4211-a92b-ae511520d5bc", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/midi": {
    channel: "regular",
    rules: [{ rule_id: "c0ceadb9-75c4-40b7-85ab-30bbb67f1123", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/mp4": {
    channel: "regular",
    rules: [{ rule_id: "2b29db8e-a724-438d-98e5-ee909d3dc454", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/persona": {
    channel: "regular",
    rules: [{ rule_id: "01451c29-f1a2-4236-8d96-0be52a48fcbd", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/replace-section": {
    channel: "regular",
    rules: [{ rule_id: "9856d038-6904-45ae-ad8d-b1cd02ab4f95", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/sounds": {
    channel: "regular",
    rules: [{ rule_id: "69318023-1b7b-4600-96d7-e0e315383f56", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/timestamped-lyrics": {
    channel: "regular",
    rules: [{ rule_id: "69eb8215-433f-47f9-823a-d2ef027bf7b3", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/upload-cover": {
    channel: "regular",
    rules: [{ rule_id: "c99957f1-40d5-4811-8901-eea5e67504a3", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/upload-extend": {
    channel: "regular",
    rules: [{ rule_id: "f39cf711-1940-4588-b8bd-715eccb228fa", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/vocal-separation": {
    channel: "regular",
    rules: [{ rule_id: "26448268-8b5f-48dd-a4a6-49485ec2f55c", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/voice-check": {
    channel: "regular",
    rules: [{ rule_id: "11de7c0f-70fb-4f35-a975-3b52cc971e22", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/voice-generate": {
    channel: "regular",
    rules: [{ rule_id: "acf6895b-d5df-4a8f-8df5-004aa055fdad", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/voice-record-info": {
    channel: "regular",
    rules: [{ rule_id: "13b9d482-cc54-4fd5-adc1-c8988d2416af", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/voice-regenerate": {
    channel: "regular",
    rules: [{ rule_id: "3ea08803-3361-4fb2-937e-e9f3130914d0", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/voice-validate": {
    channel: "regular",
    rules: [{ rule_id: "30a8d192-8ad6-4bce-8f37-94d16d6d3016", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "suno/wav": {
    channel: "regular",
    rules: [{ rule_id: "da346457-4424-4585-8b71-c8d98ad1aa6c", conditions: {}, credit_cost: 13.2, cost_unit: "per run", usd_price: 0.06 }],
  },
  "topaz/video-upscale": {
    channel: "regular",
    rules: [
      { rule_id: "86cf4d02-8173-4e93-89f4-9ceae992db34", conditions: { upscale_factor: "2" }, credit_cost: 9, cost_unit: "per second", usd_price: 0.040909 },
      { rule_id: "cba67864-89f3-4ff7-a9cf-ba7ee23e28ce", conditions: { upscale_factor: "1" }, credit_cost: 9, cost_unit: "per second", usd_price: 0.040909 },
      { rule_id: "c8381953-681a-4c27-9520-4a4c5bc339f5", conditions: { upscale_factor: "4" }, credit_cost: 16, cost_unit: "per second", usd_price: 0.072727 },
    ],
  },
  "train-rvc-model": {
    channel: "official",
    rules: [{ rule_id: "4e51081c-9045-44d5-b10c-68245c40f3e2", conditions: {}, credit_cost: 82, cost_unit: "per run", usd_price: 0.372727 }],
  },
  "use-rvc-model": {
    channel: "official",
    rules: [{ rule_id: "0c95626c-1936-4705-b732-5d4af97756aa", conditions: {}, credit_cost: 13, cost_unit: "per run", usd_price: 0.059091 }],
  },
  "vidu-q4/image-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "6ad0093e-0db2-4345-ae84-94657aecdc6a",
        conditions: { resolution: { $exists: false } },
        credit_cost: 17.56,
        cost_unit: "per second",
        usd_price: 0.079818,
      },
      { rule_id: "05e5731c-07cd-44b7-8b59-beca2c0225cd", conditions: { resolution: "4k" }, credit_cost: 72.08, cost_unit: "per second", usd_price: 0.327636 },
      { rule_id: "7da0e461-be07-4b72-9c16-73ce1ca15359", conditions: { resolution: "2k" }, credit_cost: 35.12, cost_unit: "per second", usd_price: 0.159636 },
      {
        rule_id: "30c38e55-3f1f-4896-95a2-8c9866875c0c",
        conditions: { resolution: "1080p" },
        credit_cost: 22.18,
        cost_unit: "per second",
        usd_price: 0.100818,
      },
      { rule_id: "8aaf9dc4-c6d1-4f50-b7ea-4e29de1d6f13", conditions: { resolution: "720p" }, credit_cost: 17.56, cost_unit: "per second", usd_price: 0.079818 },
      { rule_id: "6a0b5363-0bc7-4c2d-bb9e-6c45e813bbe4", conditions: { resolution: "540p" }, credit_cost: 8.32, cost_unit: "per second", usd_price: 0.037818 },
      {
        rule_id: "dceba29e-d575-4e4c-8e7b-ed9156cd86d2",
        conditions: { duration: { $exists: false }, resolution: { $exists: false } },
        credit_cost: 87.8,
        cost_unit: "per run",
        usd_price: 0.399091,
      },
      {
        rule_id: "ab1663a8-b5d4-4e28-b893-e9b632aa31dc",
        conditions: { duration: { $exists: false }, resolution: "4k" },
        credit_cost: 360.4,
        cost_unit: "per run",
        usd_price: 1.638182,
      },
      {
        rule_id: "e783af02-886c-492e-8efc-ef77425ea1fd",
        conditions: { duration: { $exists: false }, resolution: "2k" },
        credit_cost: 175.6,
        cost_unit: "per run",
        usd_price: 0.798182,
      },
      {
        rule_id: "04544874-71c1-420e-ba15-76a249344ce5",
        conditions: { duration: { $exists: false }, resolution: "1080p" },
        credit_cost: 110.9,
        cost_unit: "per run",
        usd_price: 0.504091,
      },
      {
        rule_id: "4d2c60e1-62cc-4076-9228-231986f06f87",
        conditions: { duration: { $exists: false }, resolution: "720p" },
        credit_cost: 87.8,
        cost_unit: "per run",
        usd_price: 0.399091,
      },
      {
        rule_id: "e9e70ae6-cc43-4802-a589-d41a75429ffb",
        conditions: { duration: { $exists: false }, resolution: "540p" },
        credit_cost: 41.6,
        cost_unit: "per run",
        usd_price: 0.189091,
      },
    ],
  },
  "vidu-q4/reference-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "92c236c8-654c-4117-9b74-5f90e9bbbb90",
        conditions: { resolution: { $exists: false } },
        credit_cost: 17.56,
        cost_unit: "per second",
        usd_price: 0.079818,
      },
      { rule_id: "dbb7a405-9830-4a27-b5fc-d1f3bc74a2ce", conditions: { resolution: "4k" }, credit_cost: 72.08, cost_unit: "per second", usd_price: 0.327636 },
      { rule_id: "77412685-1724-4c35-9365-19177887fc20", conditions: { resolution: "2k" }, credit_cost: 35.12, cost_unit: "per second", usd_price: 0.159636 },
      {
        rule_id: "051e8447-8853-4061-b8d6-6468dc0639c6",
        conditions: { resolution: "1080p" },
        credit_cost: 22.18,
        cost_unit: "per second",
        usd_price: 0.100818,
      },
      { rule_id: "3125e4fd-9da1-431a-a18d-bdae90b10749", conditions: { resolution: "720p" }, credit_cost: 17.56, cost_unit: "per second", usd_price: 0.079818 },
      { rule_id: "01ba8893-0f0f-412b-818e-49c042e4cce7", conditions: { resolution: "540p" }, credit_cost: 8.32, cost_unit: "per second", usd_price: 0.037818 },
      {
        rule_id: "495f5621-dd43-4f30-8cdb-2aaf172cc1cb",
        conditions: { duration: { $exists: false }, resolution: { $exists: false } },
        credit_cost: 87.8,
        cost_unit: "per run",
        usd_price: 0.399091,
      },
      {
        rule_id: "f6c93715-f6dc-4fe6-873a-5419a7d67491",
        conditions: { duration: { $exists: false }, resolution: "4k" },
        credit_cost: 360.4,
        cost_unit: "per run",
        usd_price: 1.638182,
      },
      {
        rule_id: "b91b8359-922c-4799-9263-1a0cd82fae9e",
        conditions: { duration: { $exists: false }, resolution: "2k" },
        credit_cost: 175.6,
        cost_unit: "per run",
        usd_price: 0.798182,
      },
      {
        rule_id: "b63f24aa-af6c-444c-8c31-6a598078498c",
        conditions: { duration: { $exists: false }, resolution: "1080p" },
        credit_cost: 110.9,
        cost_unit: "per run",
        usd_price: 0.504091,
      },
      {
        rule_id: "d88ae78b-a4b0-4c31-ad7c-8bbc55534f32",
        conditions: { duration: { $exists: false }, resolution: "720p" },
        credit_cost: 87.8,
        cost_unit: "per run",
        usd_price: 0.399091,
      },
      {
        rule_id: "6cd00480-852f-4d14-b71a-b8a2ac0c2e23",
        conditions: { duration: { $exists: false }, resolution: "540p" },
        credit_cost: 41.6,
        cost_unit: "per run",
        usd_price: 0.189091,
      },
    ],
  },
  "wan/wan-2-6-video-to-video": {
    channel: "regular",
    rules: [
      {
        rule_id: "fe1f56cc-d64f-46e6-931c-f793783e2539",
        conditions: { duration: "10", resolution: "1080p", nsfw_checker: false },
        credit_cost: 240,
        cost_unit: "per run",
        usd_price: 1.090909,
      },
      {
        rule_id: "7ccb880c-28f3-4667-bc15-eaa215d81159",
        conditions: { duration: "10", resolution: "720p", nsfw_checker: false },
        credit_cost: 165,
        cost_unit: "per run",
        usd_price: 0.75,
      },
      {
        rule_id: "30c5628c-8ef9-4de8-9a68-a2b793408e28",
        conditions: { duration: "15", resolution: "1080p", nsfw_checker: false },
        credit_cost: 360,
        cost_unit: "per run",
        usd_price: 1.636364,
      },
      {
        rule_id: "aa2dcf46-ca09-4f82-8ae0-8259d9fdffe9",
        conditions: { duration: "15", resolution: "720p", nsfw_checker: false },
        credit_cost: 238,
        cost_unit: "per run",
        usd_price: 1.081818,
      },
      {
        rule_id: "74e1380f-c08b-4df8-82f6-a92acf4bb19c",
        conditions: { duration: "5", resolution: "1080p", nsfw_checker: false },
        credit_cost: 120,
        cost_unit: "per run",
        usd_price: 0.545455,
      },
      {
        rule_id: "b98c2047-c5d3-4cfb-a164-85c6636f9149",
        conditions: { duration: "5", resolution: "720p", nsfw_checker: false },
        credit_cost: 80,
        cost_unit: "per run",
        usd_price: 0.363636,
      },
    ],
  },
  "wan/wan-2-7-image": {
    channel: "regular",
    rules: [
      { rule_id: "769a89f8-13b3-4138-9753-623cc54c5c66", conditions: { resolution: "1K" }, credit_cost: 6, cost_unit: "per run", usd_price: 0.027273 },
      { rule_id: "97f109f4-ea8b-431a-baf4-2d0f74b8710c", conditions: { resolution: "2K" }, credit_cost: 6, cost_unit: "per run", usd_price: 0.027273 },
    ],
  },
  "wan/wan-2-7-image-pro": {
    channel: "regular",
    rules: [
      { rule_id: "2954363c-bea0-4dba-8f6c-8fda07fe8f03", conditions: { resolution: "1K" }, credit_cost: 15, cost_unit: "per run", usd_price: 0.068182 },
      { rule_id: "6de03e68-8ac9-4bf6-b6f1-e5c17413b9f0", conditions: { resolution: "2K" }, credit_cost: 15, cost_unit: "per run", usd_price: 0.068182 },
      { rule_id: "56c2a590-a189-4877-bfb3-d852bcadc8fa", conditions: { resolution: "4K" }, credit_cost: 15, cost_unit: "per run", usd_price: 0.068182 },
    ],
  },
  "wan/wan-3-0": {
    channel: "regular",
    rules: [{ rule_id: "59bc2255-74fa-4716-a5f9-b416f876687e", conditions: {}, credit_cost: 999, cost_unit: "per run", usd_price: 4.540909 }],
  },
  "z-image/turbo": {
    channel: "official",
    rules: [{ rule_id: "1a587d1e-9348-42b4-bb64-03c2e1de11a9", conditions: {}, credit_cost: 1.5, cost_unit: "per run", usd_price: 0.006818 }],
  },
};
// ApiPass Jobs API driver. The catalogue schemas below are published provider
// metadata captured on 2026-11-05; they contain no credentials or account data.
const TASK_SPECS = {
  "omnihuman-2-0": {
    type: "image-to-video",
    schema: {
      type: "object",
      required: ["image_urls", "audio_url"],
      properties: {
        prompt: { type: "string", maxLength: 300 },
        audio_url: { type: "string", pattern: "^https?://.+" },
        image_urls: { type: "array", items: { type: "string", pattern: "^https?://.+" }, maxItems: 1, minItems: 1 },
        enable_watermark: { type: "boolean", default: true },
      },
      additionalProperties: false,
    },
  },
  "pixverse-v6-max/image-to-video": {
    type: "image-to-video",
    schema: {
      type: "object",
      required: ["prompt", "image_urls", "quality", "duration"],
      properties: {
        seed: { type: "integer", maximum: 2147483647, minimum: 0 },
        prompt: { type: "string", maxLength: 5000, minLength: 1 },
        quality: { enum: ["360p", "540p", "720p", "1080p"], type: "string" },
        duration: { type: "integer", maximum: 15, minimum: 1 },
        image_urls: { type: "array", items: { type: "string", pattern: "^https?://.+" }, maxItems: 1, minItems: 1 },
        generate_audio_switch: { type: "boolean", default: false },
      },
      additionalProperties: false,
    },
  },
  "pixverse-v6-max/text-to-video": {
    type: "text-to-video",
    schema: {
      type: "object",
      required: ["prompt", "aspect_ratio", "quality", "duration"],
      properties: {
        seed: { type: "integer", maximum: 2147483647, minimum: 0 },
        prompt: { type: "string", maxLength: 5000, minLength: 1 },
        quality: { enum: ["360p", "540p", "720p", "1080p"], type: "string" },
        duration: { type: "integer", maximum: 15, minimum: 1 },
        aspect_ratio: { enum: ["16:9", "4:3", "1:1", "3:4", "9:16", "2:3", "3:2", "21:9"], type: "string" },
        generate_audio_switch: { type: "boolean", default: false },
      },
      additionalProperties: false,
    },
  },
  "kling-4.0/keyframe-to-video": {
    type: "image-to-video",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        prompt: { type: "string", maxLength: 10000, minLength: 1 },
        duration: { type: "integer", default: 5, maximum: 30, minimum: 3 },
        resolution: { enum: ["720p", "1080p"], type: "string", default: "720p" },
        aspect_ratio: { enum: ["auto", "16:9", "9:16", "1:1", "21:9"], type: "string" },
        keyframe_urls: { type: "array", items: { type: "string", pattern: "^https?://.+" }, maxItems: 8 },
        last_frame_url: { type: "string", pattern: "^https?://.+" },
        first_frame_url: { type: "string", pattern: "^https?://.+" },
      },
      additionalProperties: false,
    },
  },
  "kling-4.0/reference-to-video": {
    type: "reference-to-video",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        prompt: { type: "string", maxLength: 10000, minLength: 1 },
        voices: { type: "array", items: { type: "object", required: ["name", "audio_url"] }, maxItems: 3 },
        duration: { type: "integer", default: 5, maximum: 30, minimum: 3 },
        elements: { type: "array", items: { type: "object" }, maxItems: 7 },
        image_urls: { type: "array", items: { type: "string", pattern: "^https?://.+" }, maxItems: 10 },
        resolution: { enum: ["720p", "1080p"], type: "string", default: "720p" },
        video_urls: { type: "array", items: { type: "string", pattern: "^https?://.+" }, maxItems: 5 },
        aspect_ratio: { enum: ["auto", "16:9", "9:16", "1:1", "21:9"], type: "string" },
        keep_original_sound: { type: "boolean", default: false },
      },
      additionalProperties: false,
    },
  },
  "flux-3-max/keyframes-to-video": {
    type: "image-to-video",
    schema: {
      type: "object",
      required: ["prompt", "keyframes"],
      properties: {
        sound: { type: "boolean", default: true },
        prompt: { type: "string", minLength: 1 },
        duration: { type: "integer", default: 5, maximum: 20, minimum: 5 },
        keyframes: {
          type: "array",
          items: {
            type: "object",
            required: ["image_url", "frame_index"],
            properties: { image_url: { type: "string", pattern: "^https?://\\S+$" }, frame_index: { type: "integer", minimum: 0 } },
            additionalProperties: false,
          },
          maxItems: 10,
          minItems: 1,
        },
        resolution: { enum: ["720p", "1080p"], type: "string", default: "720p" },
        aspect_ratio: { enum: ["auto", "21:9", "2:1", "16:9", "4:3", "1:1", "3:4", "9:16"], type: "string", default: "auto" },
      },
      additionalProperties: false,
    },
  },
  "flux-3-max/image-to-video": {
    type: "image-to-video",
    schema: {
      type: "object",
      required: ["prompt", "image_urls"],
      properties: {
        sound: { type: "boolean", default: true },
        prompt: { type: "string", minLength: 1 },
        duration: { type: "integer", default: 5, maximum: 20, minimum: 5 },
        image_urls: { type: "array", items: { type: "string", pattern: "^https?://\\S+$" }, maxItems: 2, minItems: 1 },
        resolution: { enum: ["720p", "1080p"], type: "string", default: "720p" },
        aspect_ratio: { enum: ["auto", "21:9", "2:1", "16:9", "4:3", "1:1", "3:4", "9:16"], type: "string", default: "auto" },
      },
      additionalProperties: false,
    },
  },
  "flux-3-max/text-to-video": {
    type: "text-to-video",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        sound: { type: "boolean", default: true },
        prompt: { type: "string", minLength: 1 },
        duration: { type: "integer", default: 5, maximum: 20, minimum: 5 },
        resolution: { enum: ["720p", "1080p"], type: "string", default: "720p" },
        aspect_ratio: { enum: ["auto", "21:9", "2:1", "16:9", "4:3", "1:1", "3:4", "9:16"], type: "string", default: "auto" },
      },
      additionalProperties: false,
    },
  },
  "flux-3-klein-edit": {
    type: "image-to-image",
    schema: {
      type: "object",
      required: ["prompt", "image_urls"],
      properties: {
        n: { type: "integer", default: 1, maximum: 4, minimum: 1 },
        size: { type: "string", default: "1:1" },
        prompt: { type: "string", minLength: 1 },
        image_urls: { type: "array", items: { type: "string", pattern: "^https?://\\S+$" }, maxItems: 10, minItems: 1 },
        resolution: { enum: ["1K", "2K", "4K"], type: "string", default: "1K" },
        output_format: { enum: ["jpeg", "png", "webp"], type: "string", default: "png" },
        enable_safety_checker: { type: "boolean", default: true },
      },
      additionalProperties: false,
    },
  },
  "flux-3-klein": {
    type: "text-to-image",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        n: { type: "integer", default: 1, maximum: 4, minimum: 1 },
        size: { type: "string", default: "1:1" },
        prompt: { type: "string", minLength: 1 },
        resolution: { enum: ["1K", "2K", "4K"], type: "string", default: "1K" },
        output_format: { enum: ["jpeg", "png", "webp"], type: "string", default: "png" },
        enable_safety_checker: { type: "boolean", default: true },
      },
      additionalProperties: false,
    },
  },
  "split-music": {
    type: "audio-to-audio",
    schema: {
      type: "object",
      required: ["audio_url"],
      properties: {
        model: {
          enum: [
            "harmonix-all",
            "harmonix-fold0",
            "harmonix-fold1",
            "harmonix-fold2",
            "harmonix-fold3",
            "harmonix-fold4",
            "harmonix-fold5",
            "harmonix-fold6",
            "harmonix-fold7",
          ],
          type: "string",
          default: "harmonix-all",
        },
        sonify: { type: "boolean", default: false },
        audio_url: { type: "string", format: "uri", minLength: 1 },
        visualize: { type: "boolean", default: false },
        audio_separator: { type: "boolean", default: false },
        include_embeddings: { type: "boolean", default: false },
        include_activations: { type: "boolean", default: false },
        audio_separator_model: {
          enum: [
            "Kim_Vocal_2.onnx",
            "Kim_Vocal_1.onnx",
            "Kim_Inst.onnx",
            "UVR-MDX-NET-Voc_FT.onnx",
            "UVR-MDX-NET-Inst_HQ_1.onnx",
            "UVR-MDX-NET-Inst_HQ_2.onnx",
            "UVR-MDX-NET-Inst_HQ_3.onnx",
            "UVR-MDX-NET-Inst_HQ_4.onnx",
            "UVR-MDX-NET-Inst_HQ_5.onnx",
            "UVR_MDXNET_Main.onnx",
            "UVR-MDX-NET-Inst_Main.onnx",
            "UVR_MDXNET_1_9703.onnx",
            "UVR_MDXNET_2_9682.onnx",
            "UVR_MDXNET_3_9662.onnx",
            "UVR-MDX-NET-Inst_1.onnx",
            "UVR-MDX-NET-Inst_2.onnx",
            "UVR-MDX-NET-Inst_3.onnx",
            "UVR_MDXNET_KARA.onnx",
            "UVR_MDXNET_KARA_2.onnx",
            "UVR_MDXNET_9482.onnx",
            "Reverb_HQ_By_FoxJoy.onnx",
            "UVR-MDX-NET_Crowd_HQ_1.onnx",
            "kuielab_a_vocals.onnx",
            "kuielab_a_other.onnx",
            "kuielab_a_bass.onnx",
            "kuielab_a_drums.onnx",
            "kuielab_b_vocals.onnx",
            "kuielab_b_other.onnx",
            "kuielab_b_bass.onnx",
            "kuielab_b_drums.onnx",
          ],
          type: "string",
          default: "Kim_Vocal_2.onnx",
        },
      },
    },
  },
  "create-rvc-dataset": {
    type: "audio-to-audio",
    schema: {
      type: "object",
      required: ["youtube_url"],
      properties: { audio_name: { type: "string", pattern: "^[A-Za-z0-9_-]+$" }, youtube_url: { type: "string", format: "uri", minLength: 1 } },
    },
  },
  "train-rvc-model": {
    type: "audio-to-audio",
    schema: {
      type: "object",
      required: ["dataset_zip"],
      properties: {
        epoch: { type: "integer", default: 80, minimum: 1 },
        version: { enum: ["v2"], type: "string", default: "v2" },
        f0method: { enum: ["pm", "dio", "harvest", "rmvpe", "rmvpe_gpu"], type: "string", default: "rmvpe_gpu" },
        batch_size: { type: "string", default: "7", pattern: "^[1-9][0-9]*$" },
        dataset_zip: { type: "string", format: "uri", minLength: 1 },
        sample_rate: { enum: ["40k", "48k"], type: "string", default: "48k" },
      },
    },
  },
  "use-rvc-model": {
    type: "audio-to-audio",
    schema: {
      type: "object",
      required: ["song_input", "custom_rvc_model_download_url"],
      properties: {
        protect: { type: "number", default: 0.33, maximum: 0.5, minimum: 0 },
        rvc_model: { enum: ["CUSTOM"], type: "string", default: "CUSTOM" },
        index_rate: { type: "number", default: 0.8, maximum: 1, minimum: 0 },
        song_input: { type: "string", format: "uri", minLength: 1 },
        reverb_size: { type: "number", default: 0.15, maximum: 1, minimum: 0 },
        pitch_change: { enum: ["no-change", "male-to-female", "female-to-male"], type: "string", default: "no-change" },
        rms_mix_rate: { type: "number", default: 0.25, maximum: 1, minimum: 0 },
        filter_radius: { type: "integer", default: 3, maximum: 7, minimum: 0 },
        output_format: { enum: ["mp3", "wav"], type: "string", default: "wav" },
        reverb_damping: { type: "number", default: 0.7, maximum: 1, minimum: 0 },
        reverb_dryness: { type: "number", default: 0.8, maximum: 1, minimum: 0 },
        reverb_wetness: { type: "number", default: 0.2, maximum: 1, minimum: 0 },
        crepe_hop_length: { type: "integer", default: 128, minimum: 1 },
        pitch_change_all: { type: "number", default: 0 },
        main_vocals_volume_change: { type: "number", default: 10 },
        pitch_detection_algorithm: { enum: ["rmvpe", "mangio-crepe"], type: "string", default: "rmvpe" },
        instrumental_volume_change: { type: "number", default: 0 },
        backup_vocals_volume_change: { type: "number", default: 0 },
        custom_rvc_model_download_url: { type: "string", format: "uri", minLength: 1 },
      },
    },
  },
  "vidu-q4/reference-to-video": {
    type: "reference-to-video",
    schema: {
      type: "object",
      required: ["prompt", "reference_image_urls"],
      properties: {
        audio: { type: "boolean", default: true },
        prompt: { type: "string", maxLength: 20000, minLength: 1 },
        duration: { type: "integer", default: 5, maximum: 16, minimum: 3 },
        resolution: { enum: ["540p", "720p", "1080p", "2k", "4k"], type: "string", default: "720p" },
        aspect_ratio: { enum: ["16:9", "9:16", "1:1", "4:3", "3:4"], type: "string", default: "16:9" },
        reference_audio_urls: { type: "array", items: { type: "string", pattern: "^https?://.+" }, maxItems: 3 },
        reference_image_urls: { type: "array", items: { type: "string", pattern: "^https?://.+" }, maxItems: 15, minItems: 1 },
      },
      additionalProperties: false,
    },
  },
  "openai/gpt-image-2.6-flare": {
    type: "text-to-image",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        n: { type: "integer", maximum: 10, minimum: 1 },
        size: { type: "string" },
        images: { type: "array", items: { type: "string" }, maxItems: 16 },
        prompt: { type: "string", maxLength: 20000, minLength: 1 },
        quality: { enum: ["auto", "low", "medium", "high", "xhigh", "max"], type: "string" },
        background: { enum: ["auto", "transparent", "opaque"], type: "string" },
        complexity: { enum: ["low", "medium", "high"], type: "string" },
        input_urls: { type: "array", items: { type: "string", format: "uri" }, maxItems: 16 },
        moderation: { enum: ["auto", "low"], type: "string" },
        resolution: { enum: ["1k", "2k", "4k"], type: "string" },
        frame_count: { type: "integer", maximum: 64, minimum: 2 },
        aspect_ratio: {
          enum: ["auto", "1:1", "3:2", "2:3", "4:3", "3:4", "5:4", "4:5", "16:9", "9:16", "2:1", "1:2", "3:1", "1:3", "21:9", "9:21"],
          type: "string",
        },
        output_format: { enum: ["png", "jpeg", "jpg", "webp", "gif", "svg"], type: "string" },
        frame_duration_ms: { type: "integer", maximum: 2000, minimum: 20 },
      },
    },
  },
  "openai/gpt-image-2.6-sunburst": {
    type: "text-to-image",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        n: { type: "integer", maximum: 10, minimum: 1 },
        size: { type: "string" },
        images: { type: "array", items: { type: "string" }, maxItems: 16 },
        prompt: { type: "string", maxLength: 20000, minLength: 1 },
        quality: { enum: ["auto", "low", "medium", "high", "xhigh", "max"], type: "string" },
        background: { enum: ["auto", "transparent", "opaque"], type: "string" },
        complexity: { enum: ["low", "medium", "high"], type: "string" },
        input_urls: { type: "array", items: { type: "string", format: "uri" }, maxItems: 16 },
        moderation: { enum: ["auto", "low"], type: "string" },
        resolution: { enum: ["1k", "2k", "4k"], type: "string" },
        frame_count: { type: "integer", maximum: 64, minimum: 2 },
        aspect_ratio: {
          enum: ["auto", "1:1", "3:2", "2:3", "4:3", "3:4", "5:4", "4:5", "16:9", "9:16", "2:1", "1:2", "3:1", "1:3", "21:9", "9:21"],
          type: "string",
        },
        output_format: { enum: ["png", "jpeg", "jpg", "webp", "gif", "svg"], type: "string" },
        frame_duration_ms: { type: "integer", maximum: 2000, minimum: 20 },
      },
    },
  },
  "vidu-q4/image-to-video": {
    type: "image-to-video",
    schema: {
      type: "object",
      required: ["image_url"],
      properties: {
        audio: { type: "boolean", default: true },
        prompt: { type: "string", maxLength: 20000 },
        duration: { type: "integer", default: 5, maximum: 16, minimum: 3 },
        image_url: { type: "string", pattern: "^https?://.+", minLength: 1 },
        resolution: { enum: ["540p", "720p", "1080p", "2k", "4k"], type: "string", default: "720p" },
      },
      additionalProperties: false,
    },
  },
  "openai/gpt-image-2.5": { type: "text-to-image", schema: {} },
  "openai/gpt-image-2.5-flare": { type: "text-to-image", schema: {} },
  "openai/gpt-image-2.5-sunburst": { type: "text-to-image", schema: {} },
  "bytedance/seedance-2-5": { type: "text-to-video", schema: {} },
  "wan/wan-3-0": { type: "text-to-video", schema: {} },
  "bytedance/seedance-2-mini": { type: "text-to-video", schema: {} },
  "bytedance/seedance-2-fast": { type: "text-to-video", schema: {} },
  "flux/flux-pro-image-2": { type: "text-to-image", schema: {} },
  "bytedance/seedance-2": { type: "text-to-video", schema: {} },
  "minimax/hailuo-h3": { type: "text-to-video", schema: {} },
  "google/nano-banana-2": { type: "text-to-image", schema: {} },
  "google/nano-banana-2-lite": { type: "text-to-image", schema: {} },
  "suno/generate": {
    type: "text-to-music",
    schema: {
      type: "object",
      required: ["customMode", "instrumental"],
      properties: {
        style: { type: "string", maxLength: 1000 },
        title: { type: "string", maxLength: 80 },
        prompt: { type: "string", maxLength: 5000 },
        personaId: { type: "string" },
        customMode: { type: "boolean" },
        audioWeight: { type: "number", maximum: 1, minimum: 0 },
        styleWeight: { type: "number", maximum: 1, minimum: 0 },
        vocalGender: { enum: ["m", "f"], type: "string" },
        instrumental: { type: "boolean" },
        negativeTags: { type: "string" },
        weirdnessConstraint: { type: "number", maximum: 1, minimum: 0 },
      },
    },
  },
  "suno/extend": {
    type: "text-to-music",
    schema: {
      type: "object",
      required: ["audioId"],
      properties: {
        style: { type: "string", maxLength: 1000 },
        title: { type: "string", maxLength: 80 },
        prompt: { type: "string", maxLength: 5000 },
        audioId: { type: "string" },
        personaId: { type: "string" },
        continueAt: { type: "integer", minimum: 1 },
        audioWeight: { type: "number", maximum: 1, minimum: 0 },
        styleWeight: { type: "number", maximum: 1, minimum: 0 },
        vocalGender: { enum: ["m", "f"], type: "string" },
        instrumental: { type: "boolean" },
        negativeTags: { type: "string" },
        weirdnessConstraint: { type: "number", maximum: 1, minimum: 0 },
      },
    },
  },
  "suno/upload-extend": {
    type: "text-to-music",
    schema: {
      type: "object",
      required: ["audioUrl"],
      properties: {
        style: { type: "string", maxLength: 1000 },
        title: { type: "string", maxLength: 80 },
        prompt: { type: "string", maxLength: 5000 },
        audioUrl: { type: "string" },
        personaId: { type: "string" },
        continueAt: { type: "integer", minimum: 1 },
        audioWeight: { type: "number", maximum: 1, minimum: 0 },
        styleWeight: { type: "number", maximum: 1, minimum: 0 },
        vocalGender: { enum: ["m", "f"], type: "string" },
        instrumental: { type: "boolean" },
        negativeTags: { type: "string" },
        weirdnessConstraint: { type: "number", maximum: 1, minimum: 0 },
      },
    },
  },
  "suno/upload-cover": {
    type: "text-to-music",
    schema: {
      type: "object",
      required: ["audioUrl", "customMode", "instrumental"],
      properties: {
        style: { type: "string", maxLength: 1000 },
        title: { type: "string", maxLength: 80 },
        prompt: { type: "string", maxLength: 5000 },
        audioUrl: { type: "string" },
        personaId: { type: "string" },
        customMode: { type: "boolean" },
        audioWeight: { type: "number", maximum: 1, minimum: 0 },
        styleWeight: { type: "number", maximum: 1, minimum: 0 },
        vocalGender: { enum: ["m", "f"], type: "string" },
        instrumental: { type: "boolean" },
        negativeTags: { type: "string" },
        weirdnessConstraint: { type: "number", maximum: 1, minimum: 0 },
      },
    },
  },
  "suno/timestamped-lyrics": { type: "text-to-music", schema: {} },
  "suno/lyrics": { type: "text-to-music", schema: { type: "object", required: ["prompt"], properties: { prompt: { type: "string", maxLength: 200 } } } },
  "suno/vocal-separation": {
    type: "text-to-music",
    schema: { type: "object", required: ["taskId", "audioId"], properties: { taskId: { type: "string" }, audioId: { type: "string" } } },
  },
  "suno/add-instrumental": { type: "text-to-music", schema: {} },
  "suno/add-vocals": { type: "text-to-music", schema: {} },
  "suno/boost-style": { type: "text-to-music", schema: {} },
  "suno/cover-generate": { type: "text-to-music", schema: {} },
  "suno/download": {
    type: "text-to-music",
    schema: {
      type: "object",
      required: ["url"],
      properties: { url: { type: "string", format: "uri" }, format: { enum: ["mp3", "wav"], type: "string", default: "mp3" } },
    },
  },
  "suno/generate-agent": {
    type: "text-to-music",
    schema: {
      type: "object",
      properties: {
        model: { enum: ["V6", "V6_WILD", "V6_MINI"], type: "string", default: "V6_MINI" },
        style: { type: "string", maxLength: 1000 },
        title: { type: "string", maxLength: 80 },
        lyrics: { type: "string", maxLength: 5000 },
        prompt: { type: "string", maxLength: 3000 },
        duration: { type: "integer", maximum: 360, minimum: 10 },
        audioUrls: { type: "array", items: { type: "string", format: "uri" } },
        imageUrls: { type: "array", items: { type: "string", format: "uri" }, maxItems: 5 },
        personaId: { type: "string" },
        videoUrls: { type: "array", items: { type: "string", format: "uri" }, maxItems: 1 },
        audioWeight: { type: "number", maximum: 1, minimum: 0 },
        styleWeight: { type: "number", maximum: 1, minimum: 0 },
        vocalGender: { enum: ["m", "f"], type: "string" },
        negativeTags: { type: "string", maxLength: 1000 },
        weirdnessConstraint: { type: "number", maximum: 1, minimum: 0 },
      },
    },
  },
  "suno/mashup": { type: "text-to-music", schema: {} },
  "suno/midi": { type: "text-to-music", schema: {} },
  "suno/mp4": { type: "text-to-music", schema: {} },
  "suno/persona": { type: "text-to-music", schema: {} },
  "suno/replace-section": { type: "text-to-music", schema: {} },
  "suno/sounds": { type: "text-to-music", schema: {} },
  "suno/voice-check": { type: "text-to-music", schema: {} },
  "suno/voice-generate": { type: "text-to-music", schema: {} },
  "suno/voice-record-info": { type: "text-to-music", schema: {} },
  "suno/voice-regenerate": { type: "text-to-music", schema: {} },
  "suno/voice-validate": { type: "text-to-music", schema: {} },
  "suno/wav": { type: "text-to-music", schema: {} },
  "openai/gpt-image-2": { type: "text-to-image", schema: {} },
  "google/veo-3-1-extend": { type: "video-to-video", schema: {} },
  "google/veo-3-1-fast": {
    type: "text-to-video",
    schema: {
      type: "object",
      required: ["prompt", "aspect_ratio", "video_generate_type"],
      properties: {
        images: { type: "array", maxItems: 5 },
        prompt: { type: "string" },
        aspect_ratio: { enum: ["LANDSCAPE", "PORTRAIT"], type: "string", default: "LANDSCAPE" },
        video_generate_type: { enum: ["text_to_video", "frames_to_video", "ingredients_to_video"], type: "string", default: "text_to_video" },
      },
    },
  },
  "google/veo-3-1-get-1080p-video": { type: "text-to-video", schema: {} },
  "google/veo-3-1-get-4k-video": { type: "text-to-video", schema: {} },
  "google/veo-3-1-lite": {
    type: "text-to-video",
    schema: {
      type: "object",
      required: ["model", "input"],
      properties: {
        input: {
          type: "object",
          required: ["prompt"],
          properties: {
            seeds: { type: "number" },
            prompt: { type: "string" },
            imageUrls: { type: "array", items: { type: "string" } },
            watermark: { type: "boolean" },
            aspect_ratio: { enum: ["16:9", "9:16", "Auto"], type: "string" },
            generationType: { enum: ["TEXT_2_VIDEO", "FIRST_AND_LAST_FRAMES_2_VIDEO"], type: "string" },
            enableTranslation: { type: "boolean" },
          },
        },
        model: { enum: ["google/veo-3-1-lite"], type: "string" },
        callBackUrl: { type: "string" },
      },
    },
  },
  "google/veo-3-1-quality": {
    type: "text-to-video",
    schema: {
      type: "object",
      required: ["prompt", "aspect_ratio", "video_generate_type"],
      properties: {
        images: { type: "array", maxItems: 2 },
        prompt: { type: "string" },
        aspect_ratio: { enum: ["LANDSCAPE", "PORTRAIT"], type: "string", default: "LANDSCAPE" },
        video_generate_type: { enum: ["text_to_video", "frames_to_video"], type: "string", default: "text_to_video" },
      },
    },
  },
  "google/nano-banana-pro": {
    type: "text-to-image",
    schema: {
      type: "object",
      required: ["prompt", "aspect_ratio"],
      properties: {
        images: { type: "array", maxItems: 5 },
        prompt: { type: "string" },
        aspect_ratio: { enum: ["LANDSCAPE", "PORTRAIT"], type: "string", default: "LANDSCAPE" },
      },
    },
  },
  "google/veo-3": {
    type: "text-to-video",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        seed: { type: "integer" },
        seeds: { type: "integer" },
        prompt: { type: "string", minLength: 1 },
        duration: { enum: [4, 6, 8], type: "integer", default: 8 },
        imageUrls: { type: "array", items: { type: "string", format: "uri" }, maxItems: 1 },
        resolution: { enum: ["720p", "1080p"], type: "string", default: "720p" },
        aspect_ratio: { enum: ["16:9", "9:16", "LANDSCAPE", "PORTRAIT"], type: "string", default: "16:9" },
        generate_audio: { type: "boolean", default: true },
        generationType: { enum: ["TEXT_2_VIDEO", "FIRST_AND_LAST_FRAMES_2_VIDEO"], type: "string" },
        negative_prompt: { type: "string" },
      },
      additionalProperties: false,
    },
  },
  "ideogram/vector-1.0/image-to-vector": {
    type: "image-to-image",
    schema: {
      type: "object",
      required: ["image_urls"],
      properties: {
        mode: { enum: ["default", "simple"], type: "string", default: "default" },
        images: { type: "array", items: { type: "string" }, maxItems: 1, minItems: 1 },
        image_urls: { type: "array", items: { type: "string" }, maxItems: 1, minItems: 1 },
        reference_image_urls: { type: "array", items: { type: "string" }, maxItems: 1, minItems: 1 },
      },
    },
  },
  "ideogram/vector-1.0/text-to-vector": {
    type: "text-to-image",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        n: { type: "integer", default: 1, maximum: 8, minimum: 1 },
        size: {
          enum: ["auto", "1:1", "1:4", "1:3", "1:2", "9:16", "10:16", "2:3", "3:4", "4:5", "5:4", "4:3", "3:2", "16:10", "16:9", "2:1", "3:1", "4:1"],
          type: "string",
          default: "auto",
        },
        images: { type: "array", items: { type: "string" }, maxItems: 5, minItems: 1 },
        prompt: { type: "string", maxLength: 9500, minLength: 1 },
        quality: { enum: ["low", "medium", "high"], type: "string", default: "medium" },
        image_urls: { type: "array", items: { type: "string" }, maxItems: 5, minItems: 1 },
        aspect_ratio: {
          enum: ["auto", "1:1", "1:4", "1:3", "1:2", "9:16", "10:16", "2:3", "3:4", "4:5", "5:4", "4:3", "3:2", "16:10", "16:9", "2:1", "3:1", "4:1"],
          type: "string",
        },
        reference_image_urls: { type: "array", items: { type: "string" }, maxItems: 5, minItems: 1 },
      },
    },
  },
  "google/veo-3-fast": {
    type: "text-to-video",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        seed: { type: "integer" },
        seeds: { type: "integer" },
        prompt: { type: "string", minLength: 1 },
        duration: { enum: [4, 6, 8], type: "integer", default: 8 },
        imageUrls: { type: "array", items: { type: "string", format: "uri" }, maxItems: 1 },
        resolution: { enum: ["720p", "1080p"], type: "string", default: "720p" },
        aspect_ratio: { enum: ["16:9", "9:16", "LANDSCAPE", "PORTRAIT"], type: "string", default: "16:9" },
        generate_audio: { type: "boolean", default: true },
        generationType: { enum: ["TEXT_2_VIDEO", "FIRST_AND_LAST_FRAMES_2_VIDEO"], type: "string" },
        negative_prompt: { type: "string" },
      },
      additionalProperties: false,
    },
  },
  "kling/kling-v3-video": { type: "text-to-video", schema: {} },
  runway: { type: "text-to-video", schema: {} },
  "qwen/qwen-image-2-1": { type: "text-to-image", schema: {} },
  "minimax/music-1-5": { type: "text-to-music", schema: {} },
  "kling/kling-2-6": { type: "text-to-video", schema: {} },
  "kling/kling-2-6-motion-control": { type: "image-to-video", schema: {} },
  "bytedance/omni-human-1-5": { type: "image-to-video", schema: {} },
  "minimax/hailuo-2-3": { type: "text-to-video", schema: {} },
  "apipass/image-watermaker-remove": { type: "image-to-image", schema: {} },
  "seedream/seedream-5-pro-image": { type: "text-to-image", schema: {} },
  "grok-imagine/extend": { type: "video-to-video", schema: {} },
  "grok-imagine/image-to-image": { type: "image-to-image", schema: {} },
  "grok-imagine/image-to-video": { type: "image-to-video", schema: {} },
  "grok-imagine/text-to-image": { type: "text-to-image", schema: {} },
  "grok-imagine/text-to-video": { type: "text-to-video", schema: {} },
  "grok-imagine/upscale": { type: "image-to-image", schema: {} },
  "kling/kling-v3-motion-control": { type: "image-to-video", schema: {} },
  "z-image/turbo": { type: "text-to-image", schema: {} },
  "topaz/video-upscale": { type: "video-to-video", schema: {} },
  "bytedance/seedream-v4": {
    type: "text-to-image",
    schema: {
      type: "object",
      required: ["prompt"],
      properties: {
        seed: { type: "integer", maximum: 2147483647, minimum: 0 },
        prompt: { type: "string" },
        webhook_url: { type: "string" },
        aspect_ratio: {
          enum: ["square_1_1", "widescreen_16_9", "social_story_9_16", "portrait_2_3", "traditional_3_4", "standard_3_2", "classic_4_3"],
          type: "string",
          default: "square_1_1",
        },
        guidance_scale: { type: "number", default: 2.5, maximum: 20, minimum: 0 },
      },
    },
  },
  "luma/ray-3-2-i2v": { type: "image-to-video", schema: {} },
  "luma/ray-3-2-t2v": { type: "text-to-video", schema: {} },
  "luma/ray-3-2-v2v-edit": { type: "video-to-video", schema: {} },
  "luma/ray-3-2-v2v-reframing": { type: "video-to-video", schema: {} },
  "wan/wan-2-7-image": { type: "text-to-image", schema: {} },
  "wan/wan-2-7-image-pro": { type: "text-to-image", schema: {} },
  "wan/wan-2-6-video-to-video": { type: "text-to-video", schema: {} },
  "kling/avatar-v2": { type: "image-to-video", schema: {} },
  "seedream/seedream-5-lite-image": { type: "text-to-image", schema: {} },
  "qwen/qwen-image-2": { type: "text-to-image", schema: {} },
  "google/gemini-omni-audio": { type: "text-to-speech", schema: {} },
  "google/gemini-omni-character": { type: "text-to-video", schema: {} },
  "google/gemini-omni-video": { type: "text-to-video", schema: {} },
  "grok-imagine-video-1-5-preview": { type: "text-to-video", schema: {} },
  "luma/photon": { type: "text-to-image", schema: {} },
  "luma/photon-flash": { type: "text-to-image", schema: {} },
  "luma/photon-flash-modify": { type: "image-to-image", schema: {} },
  "luma/photon-modify": { type: "image-to-image", schema: {} },
  "bytedance/seedream-4.5": { type: "text-to-image", schema: {} },
  "elevenlabs/text-to-dialogue-v3": { type: "text-to-speech", schema: {} },
  "elevenlabs/elevenlabs-v3-tts": { type: "text-to-speech", schema: {} },
  "kling/kling-3.0-omni": { type: "text-to-video", schema: {} },
  "google/nano-banana-2-1": { type: "text-to-image", schema: {} },
};
const IMAGE_MODELS = Object.keys(TASK_SPECS).filter((k) => /image$/.test(TASK_SPECS[k].type));
const VIDEO_MODELS = Object.keys(TASK_SPECS).filter((k) => /video$/.test(TASK_SPECS[k].type));
const MODELS = [
  "google/nano-banana-2",
  ...Object.keys(TASK_SPECS)
    .filter((k) => k !== "google/nano-banana-2")
    .sort(),
];
export const meta = {
  apiVersion: 1,
  key: "apipass",
  name: "APIPass",
  version: "1.0.0",
  author: { name: "BeeskyBase" },
  icon: "text:AP",
  website: "https://apipass.dev",
  description: {
    en: "Image, video and audio generation through ApiPass",
    vi: "Tạo ảnh, video và âm thanh qua APIPass",
    zh: "通过 ApiPass 生成图像、视频和音频",
  },
  channelTypes: [64],
  baseUrl: "https://api.apipass.dev",
  fetchMode: "per_task",
  models: MODELS,
  usageProfiles: [
    {
      models: ["apipass/image-watermaker-remove"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 4.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["bytedance/omni-human-1-5"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 giây", facts: { credits: 37.0, jobs: 1, rate: "r0", seconds: 1 } }],
    },
    {
      models: ["bytedance/seedance-2"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "480p · Không có video mẫu", vi: "480p · Không có video mẫu", zh: "480p · Không có video mẫu" },
            r1: { en: "480p · Có video mẫu", vi: "480p · Có video mẫu", zh: "480p · Có video mẫu" },
            r2: { en: "720p · Không có video mẫu", vi: "720p · Không có video mẫu", zh: "720p · Không có video mẫu" },
            r3: { en: "720p · Có video mẫu", vi: "720p · Có video mẫu", zh: "720p · Có video mẫu" },
            r4: { en: "1080p · Không có video mẫu", vi: "1080p · Không có video mẫu", zh: "1080p · Không có video mẫu" },
            r5: { en: "1080p · Có video mẫu", vi: "1080p · Có video mẫu", zh: "1080p · Có video mẫu" },
            r6: { en: "4K · Không có video mẫu", vi: "4K · Không có video mẫu", zh: "4K · Không có video mẫu" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 24.5, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 13.5, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 52.0, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["bytedance/seedance-2-5"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "1080p · Có video mẫu", vi: "1080p · Có video mẫu", zh: "1080p · Có video mẫu" },
            r1: { en: "1080p · Không có video mẫu", vi: "1080p · Không có video mẫu", zh: "1080p · Không có video mẫu" },
            r2: { en: "720p · Có video mẫu", vi: "720p · Có video mẫu", zh: "720p · Có video mẫu" },
            r3: { en: "720p · Không có video mẫu", vi: "720p · Không có video mẫu", zh: "720p · Không có video mẫu" },
            r4: { en: "480p · Có video mẫu", vi: "480p · Có video mẫu", zh: "480p · Có video mẫu" },
            r5: { en: "480p · Không có video mẫu", vi: "480p · Không có video mẫu", zh: "480p · Không có video mẫu" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 80.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 135.0, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 44.0, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["bytedance/seedance-2-fast"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "480p · Không có video mẫu", vi: "480p · Không có video mẫu", zh: "480p · Không có video mẫu" },
            r1: { en: "480p · Có video mẫu", vi: "480p · Có video mẫu", zh: "480p · Có video mẫu" },
            r2: { en: "720p · Không có video mẫu", vi: "720p · Không có video mẫu", zh: "720p · Không có video mẫu" },
            r3: { en: "720p · Có video mẫu", vi: "720p · Có video mẫu", zh: "720p · Có video mẫu" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 17.6, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 11.0, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 28.0, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["bytedance/seedance-2-mini"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "480p · Không có video mẫu", vi: "480p · Không có video mẫu", zh: "480p · Không có video mẫu" },
            r1: { en: "480p · Có video mẫu", vi: "480p · Có video mẫu", zh: "480p · Có video mẫu" },
            r2: { en: "720p · Không có video mẫu", vi: "720p · Không có video mẫu", zh: "720p · Không có video mẫu" },
            r3: { en: "720p · Có video mẫu", vi: "720p · Có video mẫu", zh: "720p · Có video mẫu" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 11.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 7.0, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 12.0, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["bytedance/seedream-4.5"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" }, r1: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 ảnh", facts: { credits: 8.0, jobs: 1, rate: "r0", images: 1 } },
        { label: "Ví dụ 2 · 1 ảnh", facts: { credits: 8.0, jobs: 1, rate: "r1", images: 1 } },
      ],
    },
    {
      models: ["bytedance/seedream-v4"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "1 ảnh", vi: "1 ảnh", zh: "1 ảnh" },
            r1: { en: "2 ảnh", vi: "2 ảnh", zh: "2 ảnh" },
            r2: { en: "3 ảnh", vi: "3 ảnh", zh: "3 ảnh" },
            r3: { en: "4 ảnh", vi: "4 ảnh", zh: "4 ảnh" },
            r4: { en: "5 ảnh", vi: "5 ảnh", zh: "5 ảnh" },
            r5: { en: "6 ảnh", vi: "6 ảnh", zh: "6 ảnh" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 6.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 12.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 18.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["create-rvc-dataset"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 14.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["elevenlabs/elevenlabs-v3-tts"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [],
    },
    {
      models: ["flux-3-klein"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "1 ảnh · 1K / 1k", vi: "1 ảnh · 1K / 1k", zh: "1 ảnh · 1K / 1k" },
            r1: { en: "2 ảnh · 1K / 1k", vi: "2 ảnh · 1K / 1k", zh: "2 ảnh · 1K / 1k" },
            r2: { en: "3 ảnh · 1K / 1k", vi: "3 ảnh · 1K / 1k", zh: "3 ảnh · 1K / 1k" },
            r3: { en: "4 ảnh · 1K / 1k", vi: "4 ảnh · 1K / 1k", zh: "4 ảnh · 1K / 1k" },
            r4: { en: "1 ảnh · 2K / 2k", vi: "1 ảnh · 2K / 2k", zh: "1 ảnh · 2K / 2k" },
            r5: { en: "2 ảnh · 2K / 2k", vi: "2 ảnh · 2K / 2k", zh: "2 ảnh · 2K / 2k" },
            r6: { en: "3 ảnh · 2K / 2k", vi: "3 ảnh · 2K / 2k", zh: "3 ảnh · 2K / 2k" },
            r7: { en: "4 ảnh · 2K / 2k", vi: "4 ảnh · 2K / 2k", zh: "4 ảnh · 2K / 2k" },
            r8: { en: "1 ảnh · 4K / 4k", vi: "1 ảnh · 4K / 4k", zh: "1 ảnh · 4K / 4k" },
            r9: { en: "2 ảnh · 4K / 4k", vi: "2 ảnh · 4K / 4k", zh: "2 ảnh · 4K / 4k" },
            r10: { en: "3 ảnh · 4K / 4k", vi: "3 ảnh · 4K / 4k", zh: "3 ảnh · 4K / 4k" },
            r11: { en: "4 ảnh · 4K / 4k", vi: "4 ảnh · 4K / 4k", zh: "4 ảnh · 4K / 4k" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 2.079, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 4.158, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 6.237, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["flux-3-klein-edit"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "1 ảnh · 1K / 1k", vi: "1 ảnh · 1K / 1k", zh: "1 ảnh · 1K / 1k" },
            r1: { en: "2 ảnh · 1K / 1k", vi: "2 ảnh · 1K / 1k", zh: "2 ảnh · 1K / 1k" },
            r2: { en: "3 ảnh · 1K / 1k", vi: "3 ảnh · 1K / 1k", zh: "3 ảnh · 1K / 1k" },
            r3: { en: "4 ảnh · 1K / 1k", vi: "4 ảnh · 1K / 1k", zh: "4 ảnh · 1K / 1k" },
            r4: { en: "1 ảnh · 2K / 2k", vi: "1 ảnh · 2K / 2k", zh: "1 ảnh · 2K / 2k" },
            r5: { en: "2 ảnh · 2K / 2k", vi: "2 ảnh · 2K / 2k", zh: "2 ảnh · 2K / 2k" },
            r6: { en: "3 ảnh · 2K / 2k", vi: "3 ảnh · 2K / 2k", zh: "3 ảnh · 2K / 2k" },
            r7: { en: "4 ảnh · 2K / 2k", vi: "4 ảnh · 2K / 2k", zh: "4 ảnh · 2K / 2k" },
            r8: { en: "1 ảnh · 4K / 4k", vi: "1 ảnh · 4K / 4k", zh: "1 ảnh · 4K / 4k" },
            r9: { en: "2 ảnh · 4K / 4k", vi: "2 ảnh · 4K / 4k", zh: "2 ảnh · 4K / 4k" },
            r10: { en: "3 ảnh · 4K / 4k", vi: "3 ảnh · 4K / 4k", zh: "3 ảnh · 4K / 4k" },
            r11: { en: "4 ảnh · 4K / 4k", vi: "4 ảnh · 4K / 4k", zh: "4 ảnh · 4K / 4k" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 2.079, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 4.158, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 6.237, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["flux-3-max/image-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "720p / 720P", vi: "720p / 720P", zh: "720p / 720P" },
            r1: { en: "1080p / 1080P", vi: "1080p / 1080P", zh: "1080p / 1080P" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 39.27, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 67.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["flux-3-max/keyframes-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "720p / 720P", vi: "720p / 720P", zh: "720p / 720P" },
            r1: { en: "1080p / 1080P", vi: "1080p / 1080P", zh: "1080p / 1080P" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 39.27, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 67.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["flux-3-max/text-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "720p / 720P", vi: "720p / 720P", zh: "720p / 720P" },
            r1: { en: "1080p / 1080P", vi: "1080p / 1080P", zh: "1080p / 1080P" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 39.27, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 67.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["flux/flux-pro-image-2"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "2K", vi: "2K", zh: "2K" }, r1: { en: "1K", vi: "1K", zh: "1K" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 9.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 6.0, jobs: 1, rate: "r1" } },
      ],
    },
    {
      models: ["google/gemini-omni-audio"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["google/gemini-omni-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4 giây · 720p", vi: "4 giây · 720p", zh: "4 giây · 720p" },
            r1: { en: "6 giây · 720p", vi: "6 giây · 720p", zh: "6 giây · 720p" },
            r2: { en: "8 giây · 720p", vi: "8 giây · 720p", zh: "8 giây · 720p" },
            r3: { en: "10 giây · 720p", vi: "10 giây · 720p", zh: "10 giây · 720p" },
            r4: { en: "4 giây · 1080p", vi: "4 giây · 1080p", zh: "4 giây · 1080p" },
            r5: { en: "6 giây · 1080p", vi: "6 giây · 1080p", zh: "6 giây · 1080p" },
            r6: { en: "4 giây · 1080p", vi: "4 giây · 1080p", zh: "4 giây · 1080p" },
            r7: { en: "10 giây · 1080p", vi: "10 giây · 1080p", zh: "10 giây · 1080p" },
            r8: { en: "4 giây · 4k", vi: "4 giây · 4k", zh: "4 giây · 4k" },
            r9: { en: "6 giây · 4k", vi: "6 giây · 4k", zh: "6 giây · 4k" },
            r10: { en: "8 giây · 4k", vi: "8 giây · 4k", zh: "8 giây · 4k" },
            r11: { en: "10 giây · 4k", vi: "10 giây · 4k", zh: "10 giây · 4k" },
            r12: { en: "720p", vi: "720p", zh: "720p" },
            r13: { en: "1080p", vi: "1080p", zh: "1080p" },
            r14: { en: "4k", vi: "4k", zh: "4k" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 102.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 135.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 168.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/nano-banana-2"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "2K", vi: "2K", zh: "2K" }, r1: { en: "1K", vi: "1K", zh: "1K" }, r2: { en: "4K", vi: "4K", zh: "4K" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 ảnh", facts: { credits: 15.0, jobs: 1, rate: "r0", images: 1 } },
        { label: "Ví dụ 2 · 1 ảnh", facts: { credits: 10.0, jobs: 1, rate: "r1", images: 1 } },
        { label: "Ví dụ 3 · 1 ảnh", facts: { credits: 22.0, jobs: 1, rate: "r2", images: 1 } },
      ],
    },
    {
      models: ["google/nano-banana-2-1"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" },
            r1: { en: "1K", vi: "1K", zh: "1K" },
            r2: { en: "2K", vi: "2K", zh: "2K" },
            r3: { en: "4K", vi: "4K", zh: "4K" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 5.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 5.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 7.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/nano-banana-2-lite"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 5.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["google/nano-banana-pro"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "1K", vi: "1K", zh: "1K" }, r1: { en: "2K", vi: "2K", zh: "2K" }, r2: { en: "4K", vi: "4K", zh: "4K" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 19.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 20.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 38.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/veo-3"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "8 giây · 1080p · Có âm thanh", vi: "8 giây · 1080p · Có âm thanh", zh: "8 giây · 1080p · Có âm thanh" },
            r1: { en: "8 giây · 1080p · Không âm thanh", vi: "8 giây · 1080p · Không âm thanh", zh: "8 giây · 1080p · Không âm thanh" },
            r2: { en: "6 giây · 1080p · Có âm thanh", vi: "6 giây · 1080p · Có âm thanh", zh: "6 giây · 1080p · Có âm thanh" },
            r3: { en: "6 giây · 1080p · Không âm thanh", vi: "6 giây · 1080p · Không âm thanh", zh: "6 giây · 1080p · Không âm thanh" },
            r4: { en: "4 giây · 1080p · Có âm thanh", vi: "4 giây · 1080p · Có âm thanh", zh: "4 giây · 1080p · Có âm thanh" },
            r5: { en: "4 giây · 1080p · Không âm thanh", vi: "4 giây · 1080p · Không âm thanh", zh: "4 giây · 1080p · Không âm thanh" },
            r6: { en: "8 giây · 720p · Có âm thanh", vi: "8 giây · 720p · Có âm thanh", zh: "8 giây · 720p · Có âm thanh" },
            r7: { en: "8 giây · 720p · Không âm thanh", vi: "8 giây · 720p · Không âm thanh", zh: "8 giây · 720p · Không âm thanh" },
            r8: { en: "6 giây · 720p · Có âm thanh", vi: "6 giây · 720p · Có âm thanh", zh: "6 giây · 720p · Có âm thanh" },
            r9: { en: "6 giây · 720p · Không âm thanh", vi: "6 giây · 720p · Không âm thanh", zh: "6 giây · 720p · Không âm thanh" },
            r10: { en: "4 giây · 720p · Có âm thanh", vi: "4 giây · 720p · Có âm thanh", zh: "4 giây · 720p · Có âm thanh" },
            r11: { en: "4 giây · 720p · Không âm thanh", vi: "4 giây · 720p · Không âm thanh", zh: "4 giây · 720p · Không âm thanh" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 743.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 373.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 558.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/veo-3-1-extend"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "fast", vi: "fast", zh: "fast" },
            r1: { en: "quality", vi: "quality", zh: "quality" },
            r2: { en: "lite", vi: "lite", zh: "lite" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 70.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 280.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 35.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/veo-3-1-fast"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4k", vi: "4k", zh: "4k" },
            r1: { en: "4k", vi: "4k", zh: "4k" },
            r2: { en: "1080p", vi: "1080p", zh: "1080p" },
            r3: { en: "1080p", vi: "1080p", zh: "1080p" },
            r4: { en: "720p", vi: "720p", zh: "720p" },
            r5: { en: "720p", vi: "720p", zh: "720p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 210.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 210.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 80.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/veo-3-1-get-1080p-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 6.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["google/veo-3-1-get-4k-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 138.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["google/veo-3-1-lite"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4k", vi: "4k", zh: "4k" },
            r1: { en: "4k", vi: "4k", zh: "4k" },
            r2: { en: "1080p", vi: "1080p", zh: "1080p" },
            r3: { en: "1080p", vi: "1080p", zh: "1080p" },
            r4: { en: "720p", vi: "720p", zh: "720p" },
            r5: { en: "720p", vi: "720p", zh: "720p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 170.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 170.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 40.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/veo-3-1-quality"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4k", vi: "4k", zh: "4k" },
            r1: { en: "4k", vi: "4k", zh: "4k" },
            r2: { en: "1080p", vi: "1080p", zh: "1080p" },
            r3: { en: "1080p", vi: "1080p", zh: "1080p" },
            r4: { en: "720p", vi: "720p", zh: "720p" },
            r5: { en: "720p", vi: "720p", zh: "720p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 420.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 420.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 290.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["google/veo-3-fast"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "8 giây · 1080p · Có âm thanh", vi: "8 giây · 1080p · Có âm thanh", zh: "8 giây · 1080p · Có âm thanh" },
            r1: { en: "8 giây · 1080p · Không âm thanh", vi: "8 giây · 1080p · Không âm thanh", zh: "8 giây · 1080p · Không âm thanh" },
            r2: { en: "6 giây · 1080p · Có âm thanh", vi: "6 giây · 1080p · Có âm thanh", zh: "6 giây · 1080p · Có âm thanh" },
            r3: { en: "6 giây · 1080p · Không âm thanh", vi: "6 giây · 1080p · Không âm thanh", zh: "6 giây · 1080p · Không âm thanh" },
            r4: { en: "4 giây · 1080p · Có âm thanh", vi: "4 giây · 1080p · Có âm thanh", zh: "4 giây · 1080p · Có âm thanh" },
            r5: { en: "4 giây · 1080p · Không âm thanh", vi: "4 giây · 1080p · Không âm thanh", zh: "4 giây · 1080p · Không âm thanh" },
            r6: { en: "8 giây · 720p · Có âm thanh", vi: "8 giây · 720p · Có âm thanh", zh: "8 giây · 720p · Có âm thanh" },
            r7: { en: "8 giây · 720p · Không âm thanh", vi: "8 giây · 720p · Không âm thanh", zh: "8 giây · 720p · Không âm thanh" },
            r8: { en: "6 giây · 720p · Có âm thanh", vi: "6 giây · 720p · Có âm thanh", zh: "6 giây · 720p · Có âm thanh" },
            r9: { en: "6 giây · 720p · Không âm thanh", vi: "6 giây · 720p · Không âm thanh", zh: "6 giây · 720p · Không âm thanh" },
            r10: { en: "4 giây · 720p · Có âm thanh", vi: "4 giây · 720p · Có âm thanh", zh: "4 giây · 720p · Có âm thanh" },
            r11: { en: "4 giây · 720p · Không âm thanh", vi: "4 giây · 720p · Không âm thanh", zh: "4 giây · 720p · Không âm thanh" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 281.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 188.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 211.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["grok-imagine-video-1-5-preview"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "480p", vi: "480p", zh: "480p" }, r1: { en: "720p", vi: "720p", zh: "720p" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 17.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 28.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["grok-imagine/image-to-image"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 4.620462, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["grok-imagine/image-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "480p", vi: "480p", zh: "480p" }, r1: { en: "720p", vi: "720p", zh: "720p" }, r2: { en: "1080p", vi: "1080p", zh: "1080p" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 3.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 5.5, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 9.5, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["grok-imagine/text-to-image"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" }, r1: { en: "Pro", vi: "Pro", zh: "Pro" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 4.5, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 6.0, jobs: 1, rate: "r1" } },
      ],
    },
    {
      models: ["grok-imagine/text-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "480p", vi: "480p", zh: "480p" }, r1: { en: "720p", vi: "720p", zh: "720p" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 2.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 7.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["grok-imagine/upscale"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 12.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["ideogram/vector-1.0/image-to-vector"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 ảnh", facts: { credits: 24.0, jobs: 1, rate: "r0", images: 1 } }],
    },
    {
      models: ["ideogram/vector-1.0/text-to-vector"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: [
            "r0",
            "r1",
            "r2",
            "r3",
            "r4",
            "r5",
            "r6",
            "r7",
            "r8",
            "r9",
            "r10",
            "r11",
            "r12",
            "r13",
            "r14",
            "r15",
            "r16",
            "r17",
            "r18",
            "r19",
            "r20",
            "r21",
            "r22",
            "r23",
            "r24",
            "r25",
            "r26",
            "r27",
            "r28",
            "r29",
            "r30",
            "r31",
            "r32",
            "r33",
            "r34",
            "r35",
            "r36",
            "r37",
            "r38",
            "r39",
            "r40",
            "r41",
            "r42",
            "r43",
            "r44",
            "r45",
            "r46",
            "r47",
            "r48",
          ],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" },
            r1: { en: "high", vi: "high", zh: "high" },
            r2: { en: "medium", vi: "medium", zh: "medium" },
            r3: { en: "low", vi: "low", zh: "low" },
            r4: { en: "8 ảnh · high", vi: "8 ảnh · high", zh: "8 ảnh · high" },
            r5: { en: "7 ảnh · high", vi: "7 ảnh · high", zh: "7 ảnh · high" },
            r6: { en: "6 ảnh · high", vi: "6 ảnh · high", zh: "6 ảnh · high" },
            r7: { en: "5 ảnh · high", vi: "5 ảnh · high", zh: "5 ảnh · high" },
            r8: { en: "4 ảnh · high", vi: "4 ảnh · high", zh: "4 ảnh · high" },
            r9: { en: "3 ảnh · high", vi: "3 ảnh · high", zh: "3 ảnh · high" },
            r10: { en: "2 ảnh · high", vi: "2 ảnh · high", zh: "2 ảnh · high" },
            r11: { en: "8 ảnh · medium", vi: "8 ảnh · medium", zh: "8 ảnh · medium" },
            r12: { en: "7 ảnh · medium", vi: "7 ảnh · medium", zh: "7 ảnh · medium" },
            r13: { en: "6 ảnh · medium", vi: "6 ảnh · medium", zh: "6 ảnh · medium" },
            r14: { en: "5 ảnh · medium", vi: "5 ảnh · medium", zh: "5 ảnh · medium" },
            r15: { en: "4 ảnh · medium", vi: "4 ảnh · medium", zh: "4 ảnh · medium" },
            r16: { en: "3 ảnh · medium", vi: "3 ảnh · medium", zh: "3 ảnh · medium" },
            r17: { en: "2 ảnh · medium", vi: "2 ảnh · medium", zh: "2 ảnh · medium" },
            r18: { en: "8 ảnh · low", vi: "8 ảnh · low", zh: "8 ảnh · low" },
            r19: { en: "7 ảnh · low", vi: "7 ảnh · low", zh: "7 ảnh · low" },
            r20: { en: "6 ảnh · low", vi: "6 ảnh · low", zh: "6 ảnh · low" },
            r21: { en: "5 ảnh · low", vi: "5 ảnh · low", zh: "5 ảnh · low" },
            r22: { en: "4 ảnh · low", vi: "4 ảnh · low", zh: "4 ảnh · low" },
            r23: { en: "3 ảnh · low", vi: "3 ảnh · low", zh: "3 ảnh · low" },
            r24: { en: "2 ảnh · low", vi: "2 ảnh · low", zh: "2 ảnh · low" },
            r25: { en: "high · Có ảnh mẫu", vi: "high · Có ảnh mẫu", zh: "high · Có ảnh mẫu" },
            r26: { en: "Có ảnh mẫu · high", vi: "Có ảnh mẫu · high", zh: "Có ảnh mẫu · high" },
            r27: { en: "high · Có ảnh mẫu", vi: "high · Có ảnh mẫu", zh: "high · Có ảnh mẫu" },
            r28: { en: "8 ảnh · high · Có ảnh mẫu", vi: "8 ảnh · high · Có ảnh mẫu", zh: "8 ảnh · high · Có ảnh mẫu" },
            r29: { en: "8 ảnh · Có ảnh mẫu · high", vi: "8 ảnh · Có ảnh mẫu · high", zh: "8 ảnh · Có ảnh mẫu · high" },
            r30: { en: "8 ảnh · high · Có ảnh mẫu", vi: "8 ảnh · high · Có ảnh mẫu", zh: "8 ảnh · high · Có ảnh mẫu" },
            r31: { en: "7 ảnh · high · Có ảnh mẫu", vi: "7 ảnh · high · Có ảnh mẫu", zh: "7 ảnh · high · Có ảnh mẫu" },
            r32: { en: "7 ảnh · Có ảnh mẫu · high", vi: "7 ảnh · Có ảnh mẫu · high", zh: "7 ảnh · Có ảnh mẫu · high" },
            r33: { en: "7 ảnh · high · Có ảnh mẫu", vi: "7 ảnh · high · Có ảnh mẫu", zh: "7 ảnh · high · Có ảnh mẫu" },
            r34: { en: "6 ảnh · high · Có ảnh mẫu", vi: "6 ảnh · high · Có ảnh mẫu", zh: "6 ảnh · high · Có ảnh mẫu" },
            r35: { en: "6 ảnh · Có ảnh mẫu · high", vi: "6 ảnh · Có ảnh mẫu · high", zh: "6 ảnh · Có ảnh mẫu · high" },
            r36: { en: "6 ảnh · high · Có ảnh mẫu", vi: "6 ảnh · high · Có ảnh mẫu", zh: "6 ảnh · high · Có ảnh mẫu" },
            r37: { en: "5 ảnh · high · Có ảnh mẫu", vi: "5 ảnh · high · Có ảnh mẫu", zh: "5 ảnh · high · Có ảnh mẫu" },
            r38: { en: "5 ảnh · Có ảnh mẫu · high", vi: "5 ảnh · Có ảnh mẫu · high", zh: "5 ảnh · Có ảnh mẫu · high" },
            r39: { en: "5 ảnh · high · Có ảnh mẫu", vi: "5 ảnh · high · Có ảnh mẫu", zh: "5 ảnh · high · Có ảnh mẫu" },
            r40: { en: "4 ảnh · high · Có ảnh mẫu", vi: "4 ảnh · high · Có ảnh mẫu", zh: "4 ảnh · high · Có ảnh mẫu" },
            r41: { en: "4 ảnh · Có ảnh mẫu · high", vi: "4 ảnh · Có ảnh mẫu · high", zh: "4 ảnh · Có ảnh mẫu · high" },
            r42: { en: "4 ảnh · high · Có ảnh mẫu", vi: "4 ảnh · high · Có ảnh mẫu", zh: "4 ảnh · high · Có ảnh mẫu" },
            r43: { en: "3 ảnh · high · Có ảnh mẫu", vi: "3 ảnh · high · Có ảnh mẫu", zh: "3 ảnh · high · Có ảnh mẫu" },
            r44: { en: "3 ảnh · Có ảnh mẫu · high", vi: "3 ảnh · Có ảnh mẫu · high", zh: "3 ảnh · Có ảnh mẫu · high" },
            r45: { en: "3 ảnh · high · Có ảnh mẫu", vi: "3 ảnh · high · Có ảnh mẫu", zh: "3 ảnh · high · Có ảnh mẫu" },
            r46: { en: "2 ảnh · high · Có ảnh mẫu", vi: "2 ảnh · high · Có ảnh mẫu", zh: "2 ảnh · high · Có ảnh mẫu" },
            r47: { en: "2 ảnh · Có ảnh mẫu · high", vi: "2 ảnh · Có ảnh mẫu · high", zh: "2 ảnh · Có ảnh mẫu · high" },
            r48: { en: "2 ảnh · high · Có ảnh mẫu", vi: "2 ảnh · high · Có ảnh mẫu", zh: "2 ảnh · high · Có ảnh mẫu" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 ảnh", facts: { credits: 37.0, jobs: 1, rate: "r0", images: 1 } },
        { label: "Ví dụ 2 · 1 ảnh", facts: { credits: 47.0, jobs: 1, rate: "r1", images: 1 } },
        { label: "Ví dụ 3 · 1 ảnh", facts: { credits: 37.0, jobs: 1, rate: "r2", images: 1 } },
      ],
    },
    {
      models: ["kling-4.0/keyframe-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Độ phân giải mặc định", vi: "Độ phân giải mặc định", zh: "Độ phân giải mặc định" },
            r1: { en: "1080p", vi: "1080p", zh: "1080p" },
            r2: { en: "720p", vi: "720p", zh: "720p" },
            r3: {
              en: "Thời lượng mặc định · Độ phân giải mặc định",
              vi: "Thời lượng mặc định · Độ phân giải mặc định",
              zh: "Thời lượng mặc định · Độ phân giải mặc định",
            },
            r4: { en: "Thời lượng mặc định · 1080p", vi: "Thời lượng mặc định · 1080p", zh: "Thời lượng mặc định · 1080p" },
            r5: { en: "Thời lượng mặc định · 720p", vi: "Thời lượng mặc định · 720p", zh: "Thời lượng mặc định · 720p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 32.92, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 49.09, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 32.92, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["kling-4.0/reference-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Độ phân giải mặc định", vi: "Độ phân giải mặc định", zh: "Độ phân giải mặc định" },
            r1: { en: "1080p", vi: "1080p", zh: "1080p" },
            r2: { en: "720p", vi: "720p", zh: "720p" },
            r3: {
              en: "Thời lượng mặc định · Độ phân giải mặc định",
              vi: "Thời lượng mặc định · Độ phân giải mặc định",
              zh: "Thời lượng mặc định · Độ phân giải mặc định",
            },
            r4: { en: "Thời lượng mặc định · 1080p", vi: "Thời lượng mặc định · 1080p", zh: "Thời lượng mặc định · 1080p" },
            r5: { en: "Thời lượng mặc định · 720p", vi: "Thời lượng mặc định · 720p", zh: "Thời lượng mặc định · 720p" },
            r6: { en: "1080p · Có video mẫu", vi: "1080p · Có video mẫu", zh: "1080p · Có video mẫu" },
            r7: { en: "720p · Có video mẫu", vi: "720p · Có video mẫu", zh: "720p · Có video mẫu" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 32.92, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 51.54, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 34.57, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["kling/avatar-v2"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Pro", vi: "Pro", zh: "Pro" }, r1: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 25.41, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 13.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["kling/kling-2-6"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "10 giây · Có âm thanh", vi: "10 giây · Có âm thanh", zh: "10 giây · Có âm thanh" },
            r1: { en: "10 giây · Không âm thanh", vi: "10 giây · Không âm thanh", zh: "10 giây · Không âm thanh" },
            r2: { en: "5 giây · Có âm thanh", vi: "5 giây · Có âm thanh", zh: "5 giây · Có âm thanh" },
            r3: { en: "5 giây · Không âm thanh", vi: "5 giây · Không âm thanh", zh: "5 giây · Không âm thanh" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 220.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 115.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 110.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["kling/kling-2-6-motion-control"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" }, r1: { en: "Pro", vi: "Pro", zh: "Pro" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 14.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 20.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["kling/kling-3.0-omni"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4k · Có video mẫu", vi: "4k · Có video mẫu", zh: "4k · Có video mẫu" },
            r1: { en: "1080p · Có video mẫu", vi: "1080p · Có video mẫu", zh: "1080p · Có video mẫu" },
            r2: { en: "720p · Có video mẫu", vi: "720p · Có video mẫu", zh: "720p · Có video mẫu" },
            r3: { en: "Có âm thanh · 4k", vi: "Có âm thanh · 4k", zh: "Có âm thanh · 4k" },
            r4: { en: "Có âm thanh · 4k", vi: "Có âm thanh · 4k", zh: "Có âm thanh · 4k" },
            r5: { en: "Có âm thanh · 1080p", vi: "Có âm thanh · 1080p", zh: "Có âm thanh · 1080p" },
            r6: { en: "Có âm thanh · 1080p", vi: "Có âm thanh · 1080p", zh: "Có âm thanh · 1080p" },
            r7: { en: "Có âm thanh · 720p", vi: "Có âm thanh · 720p", zh: "Có âm thanh · 720p" },
            r8: { en: "Có âm thanh · 720p", vi: "Có âm thanh · 720p", zh: "Có âm thanh · 720p" },
            r9: { en: "Có âm thanh · 4k", vi: "Có âm thanh · 4k", zh: "Có âm thanh · 4k" },
            r10: { en: "Có âm thanh · 4k", vi: "Có âm thanh · 4k", zh: "Có âm thanh · 4k" },
            r11: { en: "Có âm thanh · 1080p", vi: "Có âm thanh · 1080p", zh: "Có âm thanh · 1080p" },
            r12: { en: "Có âm thanh · 1080p", vi: "Có âm thanh · 1080p", zh: "Có âm thanh · 1080p" },
            r13: { en: "Có âm thanh · 720p", vi: "Có âm thanh · 720p", zh: "Có âm thanh · 720p" },
            r14: { en: "Có âm thanh · 720p", vi: "Có âm thanh · 720p", zh: "Có âm thanh · 720p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 75.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 30.0, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 23.5, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["kling/kling-v3-motion-control"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "720p", vi: "720p", zh: "720p" }, r1: { en: "1080p", vi: "1080p", zh: "1080p" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 24.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 32.0, jobs: 1, rate: "r1", seconds: 1 } },
      ],
    },
    {
      models: ["kling/kling-v3-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Tiêu chuẩn · Không âm thanh", vi: "Tiêu chuẩn · Không âm thanh", zh: "Tiêu chuẩn · Không âm thanh" },
            r1: { en: "Tiêu chuẩn · Có âm thanh", vi: "Tiêu chuẩn · Có âm thanh", zh: "Tiêu chuẩn · Có âm thanh" },
            r2: { en: "Pro · Không âm thanh", vi: "Pro · Không âm thanh", zh: "Pro · Không âm thanh" },
            r3: { en: "Pro · Có âm thanh", vi: "Pro · Có âm thanh", zh: "Pro · Có âm thanh" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 19.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 28.0, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 26.0, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["luma/photon"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 4.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["luma/photon-flash"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["luma/photon-flash-modify"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["luma/photon-modify"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 ảnh", facts: { credits: 4.0, jobs: 1, rate: "r0", images: 1 } }],
    },
    {
      models: ["luma/ray-3-2-i2v"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["luma/ray-3-2-t2v"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["luma/ray-3-2-v2v-edit"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["luma/ray-3-2-v2v-reframing"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["minimax/hailuo-2-3"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "10 giây · 1080p", vi: "10 giây · 1080p", zh: "10 giây · 1080p" },
            r1: { en: "6 giây · 1080p", vi: "6 giây · 1080p", zh: "6 giây · 1080p" },
            r2: { en: "10 giây · 768p", vi: "10 giây · 768p", zh: "10 giây · 768p" },
            r3: { en: "6 giây · 768p", vi: "6 giây · 768p", zh: "6 giây · 768p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 100.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 54.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 62.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["minimax/hailuo-h3"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "768P", vi: "768P", zh: "768P" },
            r1: { en: "768P", vi: "768P", zh: "768P" },
            r2: { en: "768P", vi: "768P", zh: "768P" },
            r3: { en: "768P", vi: "768P", zh: "768P" },
            r4: { en: "2K", vi: "2K", zh: "2K" },
            r5: { en: "2K", vi: "2K", zh: "2K" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 19.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 19.0, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 19.0, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["minimax/music-1-5"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 7.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["omnihuman-2-0"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 giây", facts: { credits: 16.17, jobs: 1, rate: "r0", seconds: 1 } }],
    },
    {
      models: ["openai/gpt-image-2"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12", "r13", "r14", "r15", "r16", "r17"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Không có ảnh mẫu · low · 1k", vi: "Không có ảnh mẫu · low · 1k", zh: "Không có ảnh mẫu · low · 1k" },
            r1: { en: "Có ảnh mẫu · low · 1k", vi: "Có ảnh mẫu · low · 1k", zh: "Có ảnh mẫu · low · 1k" },
            r2: { en: "Không có ảnh mẫu · medium · 1k", vi: "Không có ảnh mẫu · medium · 1k", zh: "Không có ảnh mẫu · medium · 1k" },
            r3: { en: "Có ảnh mẫu · medium · 1k", vi: "Có ảnh mẫu · medium · 1k", zh: "Có ảnh mẫu · medium · 1k" },
            r4: { en: "Không có ảnh mẫu · high · 1k", vi: "Không có ảnh mẫu · high · 1k", zh: "Không có ảnh mẫu · high · 1k" },
            r5: { en: "Có ảnh mẫu · high · 1k", vi: "Có ảnh mẫu · high · 1k", zh: "Có ảnh mẫu · high · 1k" },
            r6: { en: "Không có ảnh mẫu · low · 2k", vi: "Không có ảnh mẫu · low · 2k", zh: "Không có ảnh mẫu · low · 2k" },
            r7: { en: "Có ảnh mẫu · low · 2k", vi: "Có ảnh mẫu · low · 2k", zh: "Có ảnh mẫu · low · 2k" },
            r8: { en: "Không có ảnh mẫu · medium · 2k", vi: "Không có ảnh mẫu · medium · 2k", zh: "Không có ảnh mẫu · medium · 2k" },
            r9: { en: "Có ảnh mẫu · medium · 2k", vi: "Có ảnh mẫu · medium · 2k", zh: "Có ảnh mẫu · medium · 2k" },
            r10: { en: "Không có ảnh mẫu · high · 2k", vi: "Không có ảnh mẫu · high · 2k", zh: "Không có ảnh mẫu · high · 2k" },
            r11: { en: "Có ảnh mẫu · high · 2k", vi: "Có ảnh mẫu · high · 2k", zh: "Có ảnh mẫu · high · 2k" },
            r12: { en: "Không có ảnh mẫu · low · 4k", vi: "Không có ảnh mẫu · low · 4k", zh: "Không có ảnh mẫu · low · 4k" },
            r13: { en: "Có ảnh mẫu · low · 4k", vi: "Có ảnh mẫu · low · 4k", zh: "Có ảnh mẫu · low · 4k" },
            r14: { en: "Không có ảnh mẫu · medium · 4k", vi: "Không có ảnh mẫu · medium · 4k", zh: "Không có ảnh mẫu · medium · 4k" },
            r15: { en: "Có ảnh mẫu · medium · 4k", vi: "Có ảnh mẫu · medium · 4k", zh: "Có ảnh mẫu · medium · 4k" },
            r16: { en: "Không có ảnh mẫu · high · 4k", vi: "Không có ảnh mẫu · high · 4k", zh: "Không có ảnh mẫu · high · 4k" },
            r17: { en: "Có ảnh mẫu · high · 4k", vi: "Có ảnh mẫu · high · 4k", zh: "Có ảnh mẫu · high · 4k" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 3.2, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 4.5, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 10.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["openai/gpt-image-2.5"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4k / 4K", vi: "4k / 4K", zh: "4k / 4K" },
            r1: { en: "2k / 2K", vi: "2k / 2K", zh: "2k / 2K" },
            r2: { en: "1k / 1K", vi: "1k / 1K", zh: "1k / 1K" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 ảnh", facts: { credits: 18.5, jobs: 1, rate: "r0", images: 1 } },
        { label: "Ví dụ 2 · 1 ảnh", facts: { credits: 11.6, jobs: 1, rate: "r1", images: 1 } },
        { label: "Ví dụ 3 · 1 ảnh", facts: { credits: 7.0, jobs: 1, rate: "r2", images: 1 } },
      ],
    },
    {
      models: ["openai/gpt-image-2.5-flare"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4k / 4K", vi: "4k / 4K", zh: "4k / 4K" },
            r1: { en: "2k / 2K", vi: "2k / 2K", zh: "2k / 2K" },
            r2: { en: "1k / 1K", vi: "1k / 1K", zh: "1k / 1K" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 ảnh", facts: { credits: 18.5, jobs: 1, rate: "r0", images: 1 } },
        { label: "Ví dụ 2 · 1 ảnh", facts: { credits: 11.6, jobs: 1, rate: "r1", images: 1 } },
        { label: "Ví dụ 3 · 1 ảnh", facts: { credits: 7.0, jobs: 1, rate: "r2", images: 1 } },
      ],
    },
    {
      models: ["openai/gpt-image-2.5-sunburst"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "4k / 4K", vi: "4k / 4K", zh: "4k / 4K" },
            r1: { en: "2k / 2K", vi: "2k / 2K", zh: "2k / 2K" },
            r2: { en: "1k / 1K", vi: "1k / 1K", zh: "1k / 1K" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 ảnh", facts: { credits: 18.5, jobs: 1, rate: "r0", images: 1 } },
        { label: "Ví dụ 2 · 1 ảnh", facts: { credits: 11.6, jobs: 1, rate: "r1", images: 1 } },
        { label: "Ví dụ 3 · 1 ảnh", facts: { credits: 7.0, jobs: 1, rate: "r2", images: 1 } },
      ],
    },
    {
      models: ["openai/gpt-image-2.6-flare"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 ảnh", facts: { credits: 18.5, jobs: 1, rate: "r0", images: 1 } }],
    },
    {
      models: ["openai/gpt-image-2.6-sunburst"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        images: {
          type: "number",
          unit: "count",
          unitLabel: { en: "image", vi: "ảnh" },
          description: { en: "Price per image", vi: "Giá mỗi ảnh", zh: "每张价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 ảnh", facts: { credits: 18.5, jobs: 1, rate: "r0", images: 1 } }],
    },
    {
      models: ["pixverse-v6-max/image-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "360p · Có âm thanh", vi: "360p · Có âm thanh", zh: "360p · Có âm thanh" },
            r1: { en: "540p · Có âm thanh", vi: "540p · Có âm thanh", zh: "540p · Có âm thanh" },
            r2: { en: "720p · Có âm thanh", vi: "720p · Có âm thanh", zh: "720p · Có âm thanh" },
            r3: { en: "1080p · Có âm thanh", vi: "1080p · Có âm thanh", zh: "1080p · Có âm thanh" },
            r4: { en: "360p · Không âm thanh", vi: "360p · Không âm thanh", zh: "360p · Không âm thanh" },
            r5: { en: "540p · Không âm thanh", vi: "540p · Không âm thanh", zh: "540p · Không âm thanh" },
            r6: { en: "720p · Không âm thanh", vi: "720p · Không âm thanh", zh: "720p · Không âm thanh" },
            r7: { en: "1080p · Không âm thanh", vi: "1080p · Không âm thanh", zh: "1080p · Không âm thanh" },
            r8: { en: "360p · Có âm thanh", vi: "360p · Có âm thanh", zh: "360p · Có âm thanh" },
            r9: { en: "540p · Có âm thanh", vi: "540p · Có âm thanh", zh: "540p · Có âm thanh" },
            r10: { en: "720p · Có âm thanh", vi: "720p · Có âm thanh", zh: "720p · Có âm thanh" },
            r11: { en: "1080p · Có âm thanh", vi: "1080p · Có âm thanh", zh: "1080p · Có âm thanh" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 5.544, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 8.316, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 10.164, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["pixverse-v6-max/text-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "360p · Có âm thanh", vi: "360p · Có âm thanh", zh: "360p · Có âm thanh" },
            r1: { en: "540p · Có âm thanh", vi: "540p · Có âm thanh", zh: "540p · Có âm thanh" },
            r2: { en: "720p · Có âm thanh", vi: "720p · Có âm thanh", zh: "720p · Có âm thanh" },
            r3: { en: "1080p · Có âm thanh", vi: "1080p · Có âm thanh", zh: "1080p · Có âm thanh" },
            r4: { en: "360p · Không âm thanh", vi: "360p · Không âm thanh", zh: "360p · Không âm thanh" },
            r5: { en: "540p · Không âm thanh", vi: "540p · Không âm thanh", zh: "540p · Không âm thanh" },
            r6: { en: "720p · Không âm thanh", vi: "720p · Không âm thanh", zh: "720p · Không âm thanh" },
            r7: { en: "1080p · Không âm thanh", vi: "1080p · Không âm thanh", zh: "1080p · Không âm thanh" },
            r8: { en: "360p · Có âm thanh", vi: "360p · Có âm thanh", zh: "360p · Có âm thanh" },
            r9: { en: "540p · Có âm thanh", vi: "540p · Có âm thanh", zh: "540p · Có âm thanh" },
            r10: { en: "720p · Có âm thanh", vi: "720p · Có âm thanh", zh: "720p · Có âm thanh" },
            r11: { en: "1080p · Có âm thanh", vi: "1080p · Có âm thanh", zh: "1080p · Có âm thanh" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 5.544, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 8.316, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 10.164, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["qwen/qwen-image-2"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 7.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["qwen/qwen-image-2-1"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["runway"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["seedream/seedream-5-lite-image"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 6.6, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["seedream/seedream-5-pro-image"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["split-music"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 38.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/add-instrumental"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/add-vocals"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/boost-style"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/cover-generate"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/download"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 5.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/extend"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/generate"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/generate-agent"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 45.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/lyrics"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/mashup"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/midi"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/mp4"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/persona"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/replace-section"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/sounds"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/timestamped-lyrics"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/upload-cover"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/upload-extend"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/vocal-separation"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/voice-check"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/voice-generate"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/voice-record-info"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/voice-regenerate"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/voice-validate"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["suno/wav"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.2, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["topaz/video-upscale"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Phóng lớn 2×", vi: "Phóng lớn 2×", zh: "Phóng lớn 2×" },
            r1: { en: "Phóng lớn 1×", vi: "Phóng lớn 1×", zh: "Phóng lớn 1×" },
            r2: { en: "Phóng lớn 4×", vi: "Phóng lớn 4×", zh: "Phóng lớn 4×" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 9.0, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 9.0, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 16.0, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["train-rvc-model"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 82.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["use-rvc-model"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 13.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["vidu-q4/image-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Độ phân giải mặc định", vi: "Độ phân giải mặc định", zh: "Độ phân giải mặc định" },
            r1: { en: "4k", vi: "4k", zh: "4k" },
            r2: { en: "2k", vi: "2k", zh: "2k" },
            r3: { en: "1080p", vi: "1080p", zh: "1080p" },
            r4: { en: "720p", vi: "720p", zh: "720p" },
            r5: { en: "540p", vi: "540p", zh: "540p" },
            r6: {
              en: "Thời lượng mặc định · Độ phân giải mặc định",
              vi: "Thời lượng mặc định · Độ phân giải mặc định",
              zh: "Thời lượng mặc định · Độ phân giải mặc định",
            },
            r7: { en: "Thời lượng mặc định · 4k", vi: "Thời lượng mặc định · 4k", zh: "Thời lượng mặc định · 4k" },
            r8: { en: "Thời lượng mặc định · 2k", vi: "Thời lượng mặc định · 2k", zh: "Thời lượng mặc định · 2k" },
            r9: { en: "Thời lượng mặc định · 1080p", vi: "Thời lượng mặc định · 1080p", zh: "Thời lượng mặc định · 1080p" },
            r10: { en: "Thời lượng mặc định · 720p", vi: "Thời lượng mặc định · 720p", zh: "Thời lượng mặc định · 720p" },
            r11: { en: "Thời lượng mặc định · 540p", vi: "Thời lượng mặc định · 540p", zh: "Thời lượng mặc định · 540p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 17.56, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 72.08, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 35.12, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["vidu-q4/reference-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        seconds: { type: "number", unit: "second", description: { en: "Price per second", vi: "Giá mỗi giây", zh: "每秒价格" } },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "Độ phân giải mặc định", vi: "Độ phân giải mặc định", zh: "Độ phân giải mặc định" },
            r1: { en: "4k", vi: "4k", zh: "4k" },
            r2: { en: "2k", vi: "2k", zh: "2k" },
            r3: { en: "1080p", vi: "1080p", zh: "1080p" },
            r4: { en: "720p", vi: "720p", zh: "720p" },
            r5: { en: "540p", vi: "540p", zh: "540p" },
            r6: {
              en: "Thời lượng mặc định · Độ phân giải mặc định",
              vi: "Thời lượng mặc định · Độ phân giải mặc định",
              zh: "Thời lượng mặc định · Độ phân giải mặc định",
            },
            r7: { en: "Thời lượng mặc định · 4k", vi: "Thời lượng mặc định · 4k", zh: "Thời lượng mặc định · 4k" },
            r8: { en: "Thời lượng mặc định · 2k", vi: "Thời lượng mặc định · 2k", zh: "Thời lượng mặc định · 2k" },
            r9: { en: "Thời lượng mặc định · 1080p", vi: "Thời lượng mặc định · 1080p", zh: "Thời lượng mặc định · 1080p" },
            r10: { en: "Thời lượng mặc định · 720p", vi: "Thời lượng mặc định · 720p", zh: "Thời lượng mặc định · 720p" },
            r11: { en: "Thời lượng mặc định · 540p", vi: "Thời lượng mặc định · 540p", zh: "Thời lượng mặc định · 540p" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 giây", facts: { credits: 17.56, jobs: 1, rate: "r0", seconds: 1 } },
        { label: "Ví dụ 2 · 1 giây", facts: { credits: 72.08, jobs: 1, rate: "r1", seconds: 1 } },
        { label: "Ví dụ 3 · 1 giây", facts: { credits: 35.12, jobs: 1, rate: "r2", seconds: 1 } },
      ],
    },
    {
      models: ["wan/wan-2-6-video-to-video"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2", "r3", "r4", "r5"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: {
            r0: { en: "10 giây · 1080p · Tắt lọc an toàn", vi: "10 giây · 1080p · Tắt lọc an toàn", zh: "10 giây · 1080p · Tắt lọc an toàn" },
            r1: { en: "10 giây · 720p · Tắt lọc an toàn", vi: "10 giây · 720p · Tắt lọc an toàn", zh: "10 giây · 720p · Tắt lọc an toàn" },
            r2: { en: "15 giây · 1080p · Tắt lọc an toàn", vi: "15 giây · 1080p · Tắt lọc an toàn", zh: "15 giây · 1080p · Tắt lọc an toàn" },
            r3: { en: "15 giây · 720p · Tắt lọc an toàn", vi: "15 giây · 720p · Tắt lọc an toàn", zh: "15 giây · 720p · Tắt lọc an toàn" },
            r4: { en: "5 giây · 1080p · Tắt lọc an toàn", vi: "5 giây · 1080p · Tắt lọc an toàn", zh: "5 giây · 1080p · Tắt lọc an toàn" },
            r5: { en: "5 giây · 720p · Tắt lọc an toàn", vi: "5 giây · 720p · Tắt lọc an toàn", zh: "5 giây · 720p · Tắt lọc an toàn" },
          },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 240.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 165.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 360.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["wan/wan-2-7-image"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "1K", vi: "1K", zh: "1K" }, r1: { en: "2K", vi: "2K", zh: "2K" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 6.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 6.0, jobs: 1, rate: "r1" } },
      ],
    },
    {
      models: ["wan/wan-2-7-image-pro"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0", "r1", "r2"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "1K", vi: "1K", zh: "1K" }, r1: { en: "2K", vi: "2K", zh: "2K" }, r2: { en: "4K", vi: "4K", zh: "4K" } },
        },
      },
      examples: [
        { label: "Ví dụ 1 · 1 lượt", facts: { credits: 15.0, jobs: 1, rate: "r0" } },
        { label: "Ví dụ 2 · 1 lượt", facts: { credits: 15.0, jobs: 1, rate: "r1" } },
        { label: "Ví dụ 3 · 1 lượt", facts: { credits: 15.0, jobs: 1, rate: "r2" } },
      ],
    },
    {
      models: ["wan/wan-3-0"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 999.0, jobs: 1, rate: "r0" } }],
    },
    {
      models: ["z-image/turbo"],
      schema: {
        credits: { type: "number", unit: "credit", description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" } },
        jobs: {
          type: "number",
          unit: "count",
          unitLabel: { en: "request", vi: "lượt" },
          description: { en: "Price per request", vi: "Giá mỗi lượt", zh: "每次价格" },
        },
        rate: {
          enum: ["r0"],
          description: { en: "Configuration", vi: "Cấu hình", zh: "配置" },
          enumLabels: { r0: { en: "Tiêu chuẩn", vi: "Tiêu chuẩn", zh: "Tiêu chuẩn" } },
        },
      },
      examples: [{ label: "Ví dụ 1 · 1 lượt", facts: { credits: 1.5, jobs: 1, rate: "r0" } }],
    },
  ],
  usageSchema: {
    credits: {
      type: "number",
      unit: "credit",
      description: { en: "Billable usage units", vi: "Đơn vị sử dụng tính phí", zh: "计费用量单位" },
    },
    jobs: {
      type: "number",
      unit: "count",
      unitLabel: { en: "task", vi: "tác vụ" },
      description: { en: "Task generation unit price", vi: "Đơn giá mỗi tác vụ", zh: "生成任务单价" },
    },
  },
  usageExamples: [{ label: "One task", facts: { jobs: 1, credits: 10 } }],
  routes: [
    { method: "POST", path: "/apipass/api/v1/jobs/createTask", type: "submit", decode: "createTask", render: "taskCreated" },
    { method: "GET", path: "/apipass/api/v1/jobs/recordInfo", type: "query", taskIdParam: "taskId", render: "taskStatus" },
  ],
  protocols: [
    { name: "openai_responses", supports: ["stream", "sync", "background"] },
    { name: "openai_image", models: IMAGE_MODELS },
    { name: "openai_video", models: VIDEO_MODELS },
  ],
};
function object(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function spec(model) {
  if (!Object.prototype.hasOwnProperty.call(TASK_SPECS, model)) throw Error("Unsupported APIPass task model");
  return TASK_SPECS[model];
}
// Validate the provider's schema before a paid submission. Bound all request
// quantities independently of the host's usage-fact checks, including nested
// values. False and explicit zero are retained; defaults apply only to absence.
function validate(value, schema, path, depth = 0) {
  if (depth > 24) throw Error("APIPass input is too deeply nested");
  for (const key of ["anyOf", "oneOf"]) {
    if (!schema[key]) continue;
    let accepted = 0;
    for (const option of schema[key]) {
      try {
        validate(value, option, path, depth + 1);
        accepted++;
      } catch (e) {}
    }
    if (accepted === 0 || (key === "oneOf" && accepted !== 1)) throw Error(path + " does not match an allowed input shape");
  }
  if (schema.enum && !schema.enum.some((x) => JSON.stringify(x) === JSON.stringify(value))) throw Error(path + " has an unsupported value");
  const type = schema.type || (schema.properties ? "object" : undefined);
  if (Array.isArray(type)) {
    for (const option of type) {
      try {
        validate(value, { ...schema, type: option }, path, depth + 1);
        return;
      } catch (e) {}
    }
    throw Error(path + " has an invalid type");
  }
  if (type === "null" && value !== null) throw Error(path + " must be null");
  if (type === "object") {
    if (!object(value)) throw Error(path + " must be an object");
    const props = schema.properties || {};
    for (const k of schema.required || []) if (!Object.prototype.hasOwnProperty.call(value, k)) throw Error(path + "." + k + " is required");
    for (const k of Object.keys(value)) {
      if (!Object.prototype.hasOwnProperty.call(props, k)) {
        if (schema.additionalProperties === false) throw Error(path + "." + k + " is not supported");
      } else validate(value[k], props[k], path + "." + k, depth + 1);
    }
  } else if (type === "array") {
    if (!Array.isArray(value) || value.length < (schema.minItems || 0) || value.length > Math.min(schema.maxItems ?? 128, 128))
      throw Error(path + " has an invalid number of items");
    for (const item of value) validate(item, schema.items || {}, path + "[]", depth + 1);
  } else if (type === "string") {
    if (typeof value !== "string" || value.length < (schema.minLength || 0) || value.length > Math.min(schema.maxLength ?? 100000, 100000))
      throw Error(path + " has an invalid length");
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) throw Error(path + " has an invalid format");
    if (schema.format === "uri" && !/^https?:\/\//.test(value)) throw Error(path + " must be an HTTP or HTTPS URL");
  } else if (type === "number" || type === "integer") {
    if (typeof value !== "number" || !Number.isFinite(value) || (type === "integer" && !Number.isInteger(value)))
      throw Error(path + " must be a finite " + type);
    if (value < (schema.minimum ?? -2147483647) || value > (schema.maximum ?? 2147483647)) throw Error(path + " is outside the allowed range");
  } else if (type === "boolean" && typeof value !== "boolean") throw Error(path + " must be true or false");
}
function bounds(value, path = "input", depth = 0) {
  if (typeof value === "number" && (!Number.isFinite(value) || Math.abs(value) > 2147483647)) throw Error(path + " contains an out-of-range number");
  if (typeof value === "string" && value.length > 100000) throw Error(path + " is too long");
  if (depth > 24) throw Error("APIPass input is too deeply nested");
  if (Array.isArray(value)) {
    if (value.length > 128) throw Error(path + " has too many items");
    for (const v of value) bounds(v, path + "[]", depth + 1);
    return;
  }
  if (!object(value)) return;
  for (const [k, v] of Object.entries(value)) {
    if (/^(duration|duration_seconds|seconds|continueAt|continue_at)$/.test(k) && (typeof v === "number" || typeof v === "string")) {
      const n = Number(v);
      if (!Number.isFinite(n) || n < 0 || n > 3600) throw Error(path + "." + k + " must be between 0 and 3600");
    }
    if (/^(n|num_images|num_outputs|batch_size|count|image_count)$/.test(k)) {
      const n = Number(v);
      if (!Number.isInteger(n) || n < 1 || n > 128) throw Error(path + "." + k + " must be an integer between 1 and 128");
    }
    bounds(v, path + "." + k, depth + 1);
  }
}
function withDefaults(input, schema) {
  const out = { ...input };
  for (const [key, field] of Object.entries(schema.properties || {})) if (out[key] === undefined && field.default !== undefined) out[key] = field.default;
  return out;
}
function normalized(model, body) {
  const entry = spec(model);
  if (!object(body.input)) throw Error("APIPass input must be an object");
  const input = withDefaults(body.input, entry.schema);
  validate(input, entry.schema, "input");
  bounds(input);
  if (body.channel !== undefined && !["auto", "starter", "enterprise", "regular", "official"].includes(body.channel))
    throw Error("Unsupported APIPass channel tier");
  const channel = PRICE_RULES[model]?.channel;
  if (!channel) throw Error("APIPass model has no published sale price");
  if (body.channel !== undefined && body.channel !== "auto" && body.channel !== channel)
    throw Error("APIPass channel tier does not match the configured sale price");
  return { model, input, channel };
}
function intent(ctx, body) {
  const model = ctx.upstreamModel || ctx.model || body.model;
  // Decode precedes channel mapping, so recognize the public branded alias.
  const upstreamModel = model === "beesky/image-watermark-remove" ? "apipass/image-watermaker-remove" : model;
  const req = normalized(upstreamModel, body);
  const refs = [];
  for (const [key, value] of Object.entries(req.input))
    if (/^(taskId|task_id)$/.test(key)) {
      if (typeof value !== "string" || !value) throw Error("A gateway task ID is required");
      refs.push(value);
    }
  return {
    kind: "submit",
    model: ctx.model || body.model,
    action: spec(upstreamModel).type.replaceAll("-", "_"),
    requestBody: req,
    ...(refs.length ? { originTaskIds: refs } : {}),
  };
}
export const native = {
  createTask(ctx) {
    if (ctx.body?.kind !== "json" || !object(ctx.body.value)) throw Error("JSON object required");
    return intent(ctx, ctx.body.value);
  },
  taskCreated(ctx, task) {
    return { code: 200, message: "success", data: { taskId: task.task_id } };
  },
  taskStatus(ctx, task) {
    const states = { NOT_START: "waiting", SUBMITTED: "waiting", QUEUED: "queuing", IN_PROGRESS: "generating", SUCCESS: "success", FAILURE: "fail" };
    const data = object(task.data?.data) ? { ...task.data.data } : {};
    return {
      code: 200,
      message: "success",
      data: { ...data, taskId: task.task_id, state: states[task.status] || "unknown", ...(task.fail_reason ? { failMsg: task.fail_reason } : {}) },
    };
  },
  error(ctx, error) {
    return { code: error.httpStatus, message: error.message };
  },
};
export function buildSubmitRequest(ctx) {
  const body = normalized(ctx.upstreamModel || ctx.model, ctx.requestBody);
  if (["suno/extend", "suno/wav", "suno/vocal-separation"].includes(body.model)) {
    const origin = (ctx.originTasks || []).find(t => t.taskId === body.input.taskId);
    if (!origin || !containsAudioId(resultValue(origin.data), body.input.audioId)) throw Error("Select a song from one of your completed music tasks");
  }
  for (const k of ["taskId", "task_id"])
    if (body.input[k] !== undefined) {
      const origin = (ctx.originTasks || []).find((t) => t.taskId === body.input[k]);
      if (!origin) throw Error("Referenced task must belong to the current user and APIPass channel");
      body.input[k] = origin.upstreamTaskId;
    }
  if (body.model === "suno/extend") delete body.input.taskId;
  return {
    url: ctx.baseUrl.replace(/\/$/, "") + "/api/v1/jobs/createTask",
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + ctx.apiKey },
    body,
  };
}
export function parseSubmitResponse(ctx, response) {
  const body = response.body;
  if (!object(body) || body.code !== 200 || typeof body.data?.taskId !== "string" || !body.data.taskId) throw Error("APIPass did not return a task ID");
  return { taskId: body.data.taskId, taskData: body };
}
export function buildQueryRequest(ctx) {
  return {
    url: ctx.baseUrl.replace(/\/$/, "") + "/api/v1/jobs/recordInfo?taskId=" + encodeURIComponent(ctx.taskId),
    method: "GET",
    headers: { Authorization: "Bearer " + ctx.apiKey },
  };
}
export function parseTaskResult(ctx, body) {
  if (!object(body) || body.code !== 200 || !object(body.data)) throw Error("Invalid APIPass task status response");
  const states = { waiting: "SUBMITTED", queuing: "QUEUED", generating: "IN_PROGRESS", success: "SUCCESS", fail: "FAILURE" };
  const status = states[body.data.state] || "UNKNOWN";
  if (status === "SUCCESS") resultValue(body);
  return {
    status,
    reason: status === "FAILURE" ? String(body.data.failMsg || "APIPass task failed") : "",
    ...(status === "SUCCESS" ? { progress: "100%" } : {}),
  };
}
export function extractUsage(ctx) {
  if (ctx.usagePurpose === "billing_ratios") return null;
  const model = ctx.upstreamModel || ctx.model;
  const body = normalized(model, ctx.requestBody);
  const rule = PRICE_RULES[model].rules.find((r) => priceConditions(body.input, r.conditions));
  if (!rule) throw Error("No APIPass price matches these request parameters");
  // A per-run price may encode a batch size in its conditions. Never silently
  // accept extra outputs that the selected published rule did not price.
  for (const key of ["n", "num_images", "num_outputs", "batch_size", "count", "image_count"]) {
    if (
      body.input[key] !== undefined &&
      !(model === "train-rvc-model" && key === "batch_size") &&
      Number(body.input[key]) > 1 &&
      rule.cost_unit !== "per image" &&
      !Object.prototype.hasOwnProperty.call(rule.conditions, key)
    )
      throw Error("This APIPass price does not cover multiple outputs");
  }
  if (Number(body.input.frame_count ?? 1) > 1) throw Error("APIPass animated-image frame billing is not supported yet");
  let quantity = 1;
  if (rule.cost_unit === "per second") {
    // Input-media duration cannot be trusted from client assertions. These
    // endpoints require server-side media inspection before they can be sold.
    if (
      /motion-control|omni-human|omnihuman|avatar|topaz/.test(model) ||
      Object.entries(body.input).some(([key, value]) => /^(video|audio)_?(urls?|input)$/i.test(key) && value && (!Array.isArray(value) || value.length))
    )
      throw Error("APIPass input-media duration billing is not supported yet");
    quantity = Number(body.input.duration ?? body.input.seconds ?? body.input.duration_seconds);
    if (!Number.isFinite(quantity) || quantity <= 0 || quantity > 3600) throw Error("An explicit billable duration between 0 and 3600 seconds is required");
  } else if (rule.cost_unit === "per image") {
    const counts = ["n", "num_images", "num_outputs", "batch_size", "count", "image_count"]
      .filter((key) => body.input[key] !== undefined)
      .map((key) => Number(body.input[key]));
    if (counts.some((n) => !Number.isInteger(n) || n < 1 || n > 128)) throw Error("Invalid APIPass image count");
    if (new Set(counts).size > 1) throw Error("Conflicting APIPass image counts");
    quantity = counts[0] ?? 1;
  } else if (!["per run", "per video", "per audio"].includes(rule.cost_unit)) {
    throw Error("APIPass billing unit is not supported yet");
  }
  const credits = Number(rule.credit_cost) * quantity;
  if (!Number.isFinite(credits) || credits <= 0 || credits > 2147483647) throw Error("Invalid APIPass billable credit quantity");
  const rate = "r" + PRICE_RULES[model].rules.indexOf(rule);
  const units = { jobs: 1, credits, rate };
  if (PRICE_RULES[model].rules.some((r) => r.cost_unit === "per second")) units.seconds = rule.cost_unit === "per second" ? quantity : 0;
  if (PRICE_RULES[model].rules.some((r) => r.cost_unit === "per image")) units.images = rule.cost_unit === "per image" ? quantity : 0;
  return units;
}
export function extractUsageOnComplete(ctx, result) {
  // One successful job is one vendor operation. Do not derive a charge from
  // an undocumented provider cost or overwrite the frozen duration/count.
  return result.status === "SUCCESS" ? { jobs: 1 } : null;
}
function resultValue(body) {
  let value = body?.data?.result ?? body?.data?.resultJson;
  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch (e) {
      throw Error("Invalid APIPass result JSON", { cause: e });
    }
  }
  if (value === undefined || value === null) throw Error("APIPass result is missing");
  return value;
}
function files(body, action) {
  const value = resultValue(body);
  const out = [];
  const fallback = /video/.test(action) ? "video" : /image/.test(action) ? "image" : "audio";
  function add(url, type) {
    if (typeof url === "string" && /^https?:\/\//.test(url) && out.length < 64 && !out.some((x) => x.url === url)) out.push({ url, type });
  }
  function visit(item, depth) {
    if (depth > 6) return;
    if (Array.isArray(item)) { for (const v of item) visit(v, depth + 1); return; }
    if (!object(item)) return;
    for (const url of item.resultUrls || []) add(url, fallback);
    for (const key of ["audio_url", "audioUrl", "wavUrl", "wav_url", "vocalUrl", "vocal_url", "instrumentalUrl", "instrumental_url"]) add(item[key], "audio");
    for (const key of ["video_url", "videoUrl"]) add(item[key], "video");
    for (const key of ["image_url", "imageUrl"]) add(item[key], "image");
    for (const key of ["data", "sunoData", "tracks", "items", "result"]) visit(item[key], depth + 1);
  }
  visit(value, 0);
  return out;
}
function containsAudioId(value, audioId, depth = 0) {
  if (depth > 6) return false;
  if (Array.isArray(value)) return value.some(item => containsAudioId(item, audioId, depth + 1));
  if (!object(value)) return false;
  if ((value.id === audioId || value.audioId === audioId || value.audio_id === audioId) && (value.audioUrl || value.audio_url)) return true;
  return ["data", "sunoData", "tracks", "items", "result"].some(key => containsAudioId(value[key], audioId, depth + 1));
}
export function listArtifacts(task) {
  if (task.status !== "SUCCESS") return [];
  return files(task.data, task.action).map((f, i) => ({ key: "output-" + i, type: f.type }));
}
export function buildContentRequest(ctx) {
  const entries = files(ctx.data, ctx.action);
  const index = entries.findIndex((_, i) => "output-" + i === ctx.artifactKey);
  if (index < 0) throw Error("artifact_not_found");
  return { url: entries[index].url, method: ctx.clientRequest.method, credentialless: true };
}
function outputText(ctx, task) {
  const urls = Object.values(ctx.artifacts || {}).map((x) => x.url);
  if (urls.length) return urls.join("\n");
  const result = resultValue(task.data);
  return typeof result === "string" ? result : JSON.stringify(result);
}
function protocolInput(ctx, kind) {
  if (ctx.body?.kind !== "json" || !object(ctx.body.value)) throw Error("JSON object required; use public resource URLs for APIPass media");
  const body = ctx.body.value;
  const model = ctx.upstreamModel || ctx.model;
  const properties = spec(model).schema.properties || {};
  let input = object(body.metadata?.apipass_input) ? { ...body.metadata.apipass_input } : {};
  if (object(body.input)) input = { ...input, ...body.input };
  else if (typeof body.input === "string") input.prompt = body.input;
  else if (Array.isArray(body.input)) {
    const texts = [];
    const images = [];
    for (const item of body.input)
      for (const part of Array.isArray(item.content) ? item.content : [item]) {
        if (part?.type === "input_text" && typeof part.text === "string") texts.push(part.text);
        if (part?.type === "input_image" && typeof part.image_url === "string") images.push(part.image_url);
      }
    input.prompt = texts.join("\n");
    if (images.length) {
      const key = ["image_input", "image_urls", "images"].find((k) => Object.prototype.hasOwnProperty.call(properties, k));
      if (key) input[key] = images;
    }
  } else if (body.input !== undefined) throw Error("input must be a string or array");
  if (typeof body.prompt === "string") input.prompt = body.prompt;
  const fields = Object.keys(properties).length
    ? Object.keys(properties)
    : ["resolution", "aspect_ratio", "output_format", "seed", "image_input", "image_urls", "duration", "generate_audio"];
  for (const key of fields) if (Object.prototype.hasOwnProperty.call(body, key) && !["model", "input", "metadata"].includes(key)) input[key] = body[key];
  if (body.n !== undefined) {
    const key = ["n", "num_images", "num_outputs"].find((k) => Object.prototype.hasOwnProperty.call(properties, k));
    if (key) input[key] = body.n;
    else if (body.n !== 1) throw Error("This APIPass model supports one output per task");
  }
  if (kind === "video" && body.seconds !== undefined) input.duration = Number(body.seconds);
  return intent(ctx, { input, channel: body.metadata?.apipass_channel });
}
export const protocols = {
  openai_responses: {
    decodeRequest(ctx) {
      return protocolInput(ctx, "response");
    },
    renderFinal(ctx, task) {
      return {
        output: [
          {
            type: "message",
            role: "assistant",
            status: "completed",
            content: [{ type: "output_text", text: outputText(ctx, task), annotations: [], logprobs: [] }],
          },
        ],
        metadata: { vendor: "apipass" },
      };
    },
    renderEvents(ctx, task, previous) {
      const state = { status: task.status, progress: task.progress || "" };
      if (task.status === "SUCCESS")
        return { events: previous?.status === "SUCCESS" ? [] : [{ type: "output", data: outputText(ctx, task) }], state, done: true };
      if (task.status === "FAILURE")
        return { events: [{ type: "error", code: "task_failed", message: task.fail_reason || "APIPass task failed" }], state, done: true };
      return {
        events: previous?.status === state.status && previous?.progress === state.progress ? [] : [{ type: "progress", message: task.status.toLowerCase() }],
        state,
        done: false,
      };
    },
  },
  openai_image: {
    decodeRequest(ctx) {
      return protocolInput(ctx, "image");
    },
    render(ctx, task) {
      return {
        data: files(task.data, "image")
          .filter((x) => x.type === "image")
          .map((x) => ({ url: x.url })),
      };
    },
  },
  openai_video: {
    decodeRequest(ctx) {
      return protocolInput(ctx, "video");
    },
    render(ctx, task) {
      return { ...task.data?.data };
    },
  },
};

function priceConditions(input, conditions) {
  return Object.entries(conditions).every(([key, expected]) => {
    const actual = input[key];
    if (!object(expected)) {
      // The published Kling table encodes durations as strings, while the
      // documented JSON request uses numbers. Match only this bounded quantity.
      if (key === "duration" && typeof expected === "string" && /^\d+$/.test(expected) && (typeof actual === "number" || typeof actual === "string")) return Number.isFinite(Number(actual)) && Number(actual) === Number(expected);
      return actual === expected;
    }
    return Object.entries(expected).every(([op, value]) => {
      const empty = actual === undefined || actual === null || actual === "" || (Array.isArray(actual) && actual.length === 0);
      if (op === "$exists") return (actual !== undefined) === value;
      if (op === "$empty") return empty === value;
      if (op === "$not_empty") return !empty === value;
      if (op === "$in") return Array.isArray(value) && value.includes(actual);
      if (op === "$gt") return typeof actual === "number" && actual > value;
      if (op === "$gte") return typeof actual === "number" && actual >= value;
      if (op === "$lt") return typeof actual === "number" && actual < value;
      if (op === "$lte") return typeof actual === "number" && actual <= value;
      return false;
    });
  });
}
