import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const api_url = "http://127.0.0.1:5000"
// export const api_url = "https://ucscn-farmfi.onrender.com"