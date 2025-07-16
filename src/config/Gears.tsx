import Headphones from '@/components/svgs/devices/Headphones';
import Keyboard from '@/components/svgs/devices/Keyboard';
import Laptop from '@/components/svgs/devices/Laptop';
import Monitor from '@/components/svgs/devices/Monitor';
import Mouse from '@/components/svgs/devices/Mouse';
import Phone from '@/components/svgs/devices/Phone';

export const devices = [
  {
    name: 'MacBook Air 13.6" M2 16GB 256GB',
    icon: <Laptop className="size-4" />,
  },
  {
    name: 'HP Probook 440 14" Intel i5 16GB 512GB',
    icon: <Laptop className="size-4" />,
  },
  {
    name: 'BenQ GW2486TC 24" IPS 100Hz Full HD Coding Monitor',
    icon: <Monitor className="size-4" />,
  },
  {
    name: 'HP GK320 Wired Full Size RGB Backlight Mechanical Gaming Keyboard',
    icon: <Keyboard className="size-4" />,
  },
  {
    name: 'Portronics Toad one',
    icon: <Mouse className="size-4" />,
  },
  {
    name: 'SkullCandy Smokin Buds',
    icon: <Headphones className="size-4" />,
  },
  {
    name: 'Iphone 15 (256 GB)',
    icon: <Phone className="size-4" />,
  },
];

export const webExtensions = [
  { name: 'Unhook', href: 'https://unhook.app/' },
  {
    name: 'React Developer Tools',
    href: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en',
  },
  { name: 'daily.dev', href: 'https://daily.dev/' },
  { name: 'Grammarly', href: 'https://www.grammarly.com/' },
  { name: 'Wappalyzer', href: 'https://www.wappalyzer.com/' },
  {
    name: 'TextBlaze',
    href: 'https://chromewebstore.google.com/detail/text-blaze-templates-and/idgadaccgipmpannjkmfddolnnhmeklj',
  },
];

export const software = [
  { name: 'Zen Browser', href: 'https://zen-browser.app/' },
  { name: 'Discord', href: 'https://discord.com/download' },
  { name: 'Notion', href: 'https://www.notion.so/desktop' },
  { name: 'TickTick', href: 'https://ticktick.com/download' },
  { name: 'VS Code', href: 'https://code.visualstudio.com' },
  { name: 'ChatGPT Desktop', href: 'https://chatgpt.com/' },
];
