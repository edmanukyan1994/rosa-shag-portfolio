import { ServiceCategory } from "@/types";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "ugc",
    title: "UGC for Brand Channels & Ads",
    subtitle:
      "Raw, high-converting content shot for your paid social & organic channels — you own full usage rights.",
    tiers: [
      {
        id: "ugc-single",
        name: "1 Video Package",
        price: "$180",
        priceHint: "per video",
        description: "One polished vertical video, ready for paid or organic use.",
        features: [
          "1 script concept + 1 revision",
          "1 vertical video (9:16)",
          "Raw + edited clean-audio version",
          "Full usage rights, no time limit",
          "3-day turnaround",
        ],
        ctaLabel: "Order this package",
      },
      {
        id: "ugc-bundle",
        name: "3-Video Testing Bundle",
        price: "$480",
        priceHint: "save $60",
        description: "Three distinct hooks/angles to test and scale what performs.",
        features: [
          "3 unique scripts & hooks",
          "3 vertical videos (9:16)",
          "A/B ready hook variations",
          "Full usage rights, no time limit",
          "5-day turnaround",
          "Priority feedback rounds",
        ],
        highlighted: true,
        ctaLabel: "Book the bundle",
      },
      {
        id: "ugc-photo-video",
        name: "Photos + Video Bundle",
        price: "$650",
        priceHint: "best value",
        description: "Full content drop — stills for feed/website + video for ads.",
        features: [
          "2 vertical videos (9:16)",
          "15 edited product/lifestyle photos",
          "Consistent visual concept",
          "Full usage rights, no time limit",
          "6-day turnaround",
        ],
        ctaLabel: "Get the full bundle",
      },
    ],
  },
  {
    id: "influence",
    title: "In-Feed Placement (Influence)",
    subtitle:
      "Content posted natively on my own channels — reach my audience with authentic, on-brand storytelling.",
    tiers: [
      {
        id: "inf-story",
        name: "Story Feature",
        price: "$120",
        priceHint: "per set",
        description: "Native story set introducing your product to my audience.",
        features: [
          "3–5 story frames",
          "Swipe-up / link sticker",
          "24h insights screenshot",
          "48h turnaround",
        ],
        ctaLabel: "Book a story feature",
      },
      {
        id: "inf-reel",
        name: "In-Feed Reel",
        price: "$320",
        priceHint: "per post",
        description: "One dedicated in-feed reel posted natively on my channel.",
        features: [
          "Full creative concept",
          "Posted natively (Reels/TikTok)",
          "Pinned for 7 days",
          "Performance report",
          "5-day turnaround",
        ],
        highlighted: true,
        ctaLabel: "Book a reel",
      },
      {
        id: "inf-campaign",
        name: "Full Campaign",
        price: "Custom",
        priceHint: "let's talk",
        description: "Multi-post campaign combining stories, reels & whitelisting.",
        features: [
          "3+ in-feed posts",
          "Usage rights for whitelisting",
          "Dedicated content calendar",
          "Priority support",
        ],
        ctaLabel: "Request a quote",
      },
    ],
  },
];
