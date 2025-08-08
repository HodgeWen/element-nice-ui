import { $ } from 'execa'
await $({
  stdio: 'inherit'
})`vite`
