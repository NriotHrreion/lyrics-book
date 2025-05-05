import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export async function writeToClipboard(text: string) {
    if(navigator.clipboard) {
        await navigator.clipboard.writeText(text);
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
