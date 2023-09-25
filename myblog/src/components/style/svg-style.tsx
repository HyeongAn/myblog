'use client'

import { useEffect, useState } from 'react'

interface SvgProps {
  image: string
}

const SvgStyle = ({ image }: SvgProps) => {
  switch (image) {
    case 'left':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17.9999 12.0001V14.6701C17.9999 17.9801 15.6499 19.3401 12.7799 17.6801L10.4699 16.3401L8.15995 15.0001C5.28995 13.3401 5.28995 10.6301 8.15995 8.97005L10.4699 7.63005L12.7799 6.29005C15.6499 4.66005 17.9999 6.01005 17.9999 9.33005V12.0001Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'right':
      return (
        <svg width="24px" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 11.9999V9.32992C6 6.01992 8.35 4.65992 11.22 6.31992L13.53 7.65992L15.84 8.99992C18.71 10.6599 18.71 13.3699 15.84 15.0299L13.53 16.3699L11.22 17.7099C8.35 19.3399 6 17.9899 6 14.6699V11.9999Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'play':
      return (
        <svg width="24px" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44712 2 1.96997 6.47715 1.96997 12C1.96997 17.5228 6.44712 22 11.97 22Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.73999 12.2299V10.5599C8.73999 8.47988 10.21 7.62988 12.01 8.66988L13.46 9.50988L14.91 10.3499C16.71 11.3899 16.71 13.0899 14.91 14.1299L13.46 14.9699L12.01 15.8099C10.21 16.8499 8.73999 15.9999 8.73999 13.9199V12.2299Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'stop':
      return (
        <svg width="24px" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'git':
      return (
        <svg width="22" height="22" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
            transform="scale(64)"
            fill="currentColor"
          />
        </svg>
      )
    case 'email':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
          ></path>
        </svg>
      )
    case 'rocket':
      return (
        <svg width="21" height="21" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_1_3)">
            <path
              d="M80.78 51.6301C80.36 50.9801 79.88 50.3201 79.38 49.6301C77.3985 46.8322 75.0433 44.3189 72.38 42.16C72.3292 42.1137 72.2758 42.0703 72.22 42.03L72.07 42C71.82 41.83 71.69 41.76 71.69 41.76C71.4088 41.5953 71.1058 41.4707 70.79 41.39C70.5306 41.3324 70.2658 41.3023 70 41.3C69.7875 41.3007 69.5759 41.3275 69.37 41.3801C68.8524 41.5255 68.3695 41.7738 67.95 42.1101C67.79 42.2201 67.6 42.3701 67.4 42.5401C64.3171 45.1767 61.6236 48.2371 59.4 51.6301C55.9875 56.7819 54.1589 62.8205 54.14 69C54.1389 73.1725 55.1295 77.2855 57.03 81L57.34 81.59C57.47 81.84 57.62 82.0801 57.76 82.3301C59.8294 85.5603 62.348 88.4796 65.24 91C67.1 92.57 68.81 93.9 70.35 95C71.35 94.27 72.35 93.53 73.24 92.77C73.73 92.37 74.24 91.9601 74.66 91.5501L74.75 91.4701C75.19 91.0801 75.61 90.6901 76.02 90.3001L76.22 90.1C76.58 89.74 76.95 89.38 77.29 89.02C77.41 88.9 77.52 88.7701 77.63 88.6501L78.49 87.7201L79.02 87.0801C79.21 86.8501 79.42 86.62 79.6 86.39C79.96 85.94 80.31 85.48 80.6 85.03C84.0655 80.4004 85.9578 74.7829 86 69C85.993 62.8246 84.1784 56.7863 80.78 51.6301Z"
              fill="#121443"
            />
            <path
              d="M71.58 114.64L70.13 113.76C60.84 118.27 50.92 126.22 45.57 135.58C61.4523 141.488 78.9367 141.445 94.79 135.46C89 126.27 80.84 120.05 71.58 114.64Z"
              fill="#121443"
            />
            <path
              d="M140 70C140 57.93 136.88 46.0649 130.941 35.5568C125.003 25.0488 116.448 16.2548 106.108 10.0287C95.7676 3.80266 83.9931 0.356122 71.9276 0.0237436C59.8622 -0.308635 47.9158 2.48444 37.2484 8.13177C26.581 13.7791 17.5551 22.0888 11.0471 32.254C4.53905 42.4192 0.770045 54.0945 0.106024 66.1462C-0.557998 78.198 1.90553 90.2166 7.25739 101.035C12.6093 111.854 20.6676 121.105 30.65 127.89C31.16 127.09 32.05 125.76 32.79 124.67C33.53 123.58 42.36 111.26 55.86 104C55.86 104 55.54 103.75 55.38 103.61L55.1 103.36C47.9 97.1 42.92 90.23 40.23 82.77C40.23 82.69 40.17 82.62 40.13 82.53C38.7392 78.764 37.9528 74.8017 37.8 70.79C37.7314 69.1 37.7548 67.4075 37.87 65.72C37.87 65.66 37.87 65.6 37.87 65.55C37.87 65.12 37.87 64.85 37.87 64.85C38.0437 62.4917 38.4048 60.151 38.95 57.85C41.48 47.35 47.55 39.39 53.47 33.77H53.42C57.4355 29.9136 61.961 26.6263 66.87 24H66.96C67.8905 23.5326 68.9187 23.2927 69.96 23.3C70.684 23.2934 71.404 23.4083 72.09 23.64C72.09 23.64 73.35 23.84 77.79 26.91C78.63 27.47 79.56 28.13 80.58 28.91C88.91 35.24 102.28 48.61 102.28 69.06C102.28 69.9 102.28 70.73 102.21 71.56C102.21 71.89 102.15 72.21 102.12 72.56C102.12 73.05 102.05 73.56 101.99 74.03C101.93 74.5 101.87 74.88 101.8 75.3C101.73 75.72 101.7 76.07 101.63 76.44C101.56 76.81 101.43 77.44 101.32 77.88C101.26 78.19 101.2 78.5 101.12 78.81C100.99 79.34 100.84 79.81 100.69 80.37C100.62 80.63 100.56 80.89 100.48 81.14C100.3 81.7 100.11 82.25 99.91 82.8C99.84 83.01 99.77 83.22 99.69 83.42C99.47 84.01 99.23 84.59 98.98 85.17L98.77 85.66C98.5 86.27 98.2 86.88 97.9 87.48C97.83 87.61 97.77 87.74 97.71 87.87C97.38 88.49 97.03 89.11 96.71 89.73C96.65 89.83 96.6 89.93 96.54 90.02C96.16 90.67 95.76 91.3 95.34 91.93L95.2 92.14C94.77 92.79 94.31 93.44 93.83 94.08C93.8025 94.1306 93.7689 94.1776 93.73 94.22C93.24 94.88 92.73 95.53 92.19 96.22L92.12 96.3C91.57 96.96 91 97.61 90.41 98.3C89.81 98.96 89.19 99.61 88.54 100.3C87.2067 101.593 85.8167 102.86 84.37 104.1L85.31 104.63C98.31 112.07 106.74 123.94 107.5 125.05C108.26 126.16 108.97 127.27 109.44 128.05C118.895 121.613 126.625 112.954 131.953 102.833C137.281 92.7117 140.044 81.4378 140 70Z"
              fill="#121443"
            />
            <path
              d="M70.1 113.78L69.36 113.32C67.67 112.32 66.42 111.54 65.06 110.66C61.8728 108.589 58.7984 106.349 55.85 103.95C42.35 111.26 33.54 123.56 32.78 124.67C32.02 125.78 31.15 127.09 30.64 127.89C32.9179 129.447 35.289 130.863 37.74 132.13C40.2625 133.446 42.8642 134.605 45.53 135.6C50.89 126.24 60.81 118.29 70.1 113.78Z"
              fill="white"
            />
            <path
              d="M70.1 113.78L69.36 113.32C67.67 112.32 66.42 111.54 65.06 110.66C61.8728 108.589 58.7984 106.349 55.85 103.95C42.35 111.26 33.54 123.56 32.78 124.67C32.02 125.78 31.15 127.09 30.64 127.89C32.8553 129.392 35.1558 130.764 37.53 132C40.1196 133.359 42.7914 134.554 45.53 135.58C50.89 126.24 60.81 118.29 70.1 113.78Z"
              fill="url(#paint0_linear_1_3)"
            />
            <path
              d="M107.41 124.93C106.65 123.82 98.25 111.93 85.22 104.51L84.28 103.98C85.76 102.74 87.15 101.473 88.45 100.18C89.1 99.54 89.72 98.89 90.32 98.18C90.91 97.53 91.48 96.88 92.03 96.18L92.1 96.1C92.63 95.45 93.15 94.8 93.64 94.1C93.6789 94.0576 93.7125 94.0105 93.74 93.96C94.22 93.32 94.68 92.67 95.11 92.02L95.25 91.81C95.67 91.18 96.07 90.55 96.45 89.9C96.51 89.81 96.56 89.71 96.62 89.61C96.97 88.99 97.32 88.37 97.62 87.75C97.68 87.62 97.74 87.49 97.81 87.36C98.11 86.76 98.41 86.15 98.68 85.54L98.89 85.05C99.14 84.47 99.38 83.89 99.6 83.3C99.68 83.1 99.75 82.89 99.82 82.68C100.02 82.13 100.21 81.58 100.39 81.02C100.47 80.77 100.53 80.51 100.6 80.25C100.75 79.73 100.9 79.25 101.03 78.69C101.11 78.38 101.17 78.07 101.23 77.76C101.34 77.28 101.45 76.76 101.54 76.32C101.63 75.88 101.65 75.56 101.71 75.18C101.77 74.8 101.85 74.34 101.9 73.91C101.95 73.48 101.99 72.91 102.03 72.44C102.03 72.11 102.1 71.79 102.12 71.44C102.12 70.61 102.19 69.78 102.19 68.94C102.19 48.49 88.82 35.12 80.49 28.79C79.49 28.01 78.49 27.35 77.7 26.79C73.26 23.72 72 23.52 72 23.52C71.3537 23.3124 70.6788 23.2078 70 23.21C68.9587 23.2027 67.9305 23.4426 67 23.91H66.91C62.0101 26.5833 57.5012 29.9179 53.51 33.82H53.56C47.6 39.47 41.53 47.43 39 57.93C38.4548 60.231 38.0937 62.5717 37.92 64.93C37.92 64.93 37.92 65.2 37.92 65.63C37.92 65.63 37.92 65.74 37.92 65.8C37.8048 67.4875 37.7814 69.18 37.85 70.87C38.0028 74.8817 38.7892 78.844 40.18 82.61C40.18 82.7 40.24 82.77 40.28 82.85C42.97 90.31 47.95 97.18 55.16 103.37L55.44 103.62C55.6 103.76 55.92 104.01 55.92 104.01C58.8684 106.409 61.9428 108.649 65.13 110.72C66.49 111.6 67.74 112.36 69.43 113.38L70.17 113.84L71.62 114.72C80.88 120.13 89.08 126.35 94.8 135.56C99.9468 133.617 104.844 131.069 109.39 127.97C108.88 127.15 108.23 126.13 107.41 124.93ZM79.62 86.39C79.44 86.62 79.23 86.85 79.04 87.08L78.51 87.72L77.65 88.65C77.54 88.77 77.43 88.9 77.31 89.02C76.97 89.38 76.6 89.74 76.24 90.1L76.04 90.3C75.63 90.69 75.21 91.08 74.77 91.47L74.68 91.55C74.22 91.96 73.75 92.37 73.26 92.77C72.34 93.53 71.37 94.27 70.37 95C68.83 93.86 67.12 92.53 65.26 91C62.3651 88.4673 59.8463 85.5344 57.78 82.29C57.64 82.04 57.49 81.8 57.36 81.55L57 80.94C55.0995 77.2255 54.1089 73.1125 54.11 68.94C54.1299 62.7683 55.9548 56.7373 59.36 51.59C61.5836 48.1971 64.2771 45.1366 67.36 42.5C67.56 42.33 67.75 42.18 67.91 42.07C68.3295 41.7337 68.8124 41.4854 69.33 41.34C69.5507 41.2976 69.7759 41.2841 70 41.3C70.2654 41.2989 70.5302 41.3258 70.79 41.38C71.1058 41.4607 71.4088 41.5852 71.69 41.75C71.69 41.75 71.82 41.82 72.07 41.99L72.21 42.07C72.2658 42.1103 72.3192 42.1537 72.37 42.2C75.0334 44.3589 77.3886 46.8722 79.37 49.67C79.87 50.33 80.37 50.99 80.77 51.67C84.1644 56.8138 85.9822 62.8372 86 69C85.9572 74.7703 84.0723 80.3761 80.62 85C80.33 85.48 80 85.94 79.62 86.39Z"
              fill="white"
            />
            <path
              opacity="0.7"
              d="M84.07 103.87L84.28 103.98C84.94 103.42 85.69 102.78 86.48 102.06C87.48 101.06 88.3 100.34 88.48 100.13C89.13 99.49 89.75 98.84 90.35 98.13C90.94 97.48 91.51 96.83 92.06 96.13L92.13 96.05C92.66 95.4 93.18 94.75 93.67 94.05C93.7089 94.0075 93.7425 93.9605 93.77 93.91C94.25 93.27 94.71 92.62 95.14 91.97L95.28 91.76C95.7 91.13 96.1 90.5 96.48 89.86L96.65 89.56C97 88.94 97.35 88.32 97.65 87.7C97.71 87.57 97.77 87.44 97.84 87.31C98.14 86.71 98.44 86.1 98.71 85.49L98.92 85C99.17 84.42 99.41 83.84 99.63 83.25C99.71 83.05 99.78 82.84 99.85 82.63C100.05 82.08 100.24 81.53 100.42 80.97C100.5 80.72 100.56 80.46 100.63 80.2C100.78 79.68 100.93 79.2 101.06 78.64C101.14 78.33 101.2 78.02 101.26 77.71C101.37 77.23 101.48 76.71 101.57 76.27C101.66 75.83 101.68 75.51 101.74 75.13C101.8 74.75 101.88 74.29 101.93 73.86C101.98 73.43 102.02 72.86 102.06 72.39C102.06 72.06 102.13 71.74 102.15 71.39C102.15 70.56 102.22 69.73 102.22 68.89C102.22 43.75 82.01 29.31 75.81 25.48L72.21 42.06C75.4868 44.8435 78.3699 48.0596 80.78 51.62C84.1802 56.7791 85.9949 62.8211 86 69C85.9572 74.7703 84.0723 80.3761 80.62 85C80.3 85.45 79.95 85.91 79.62 86.36C79.44 86.59 79.23 86.82 79.04 87.05L78.51 87.69L77.65 88.62C77.54 88.74 77.43 88.87 77.31 88.99C76.97 89.35 76.6 89.71 76.24 90.07L76.04 90.27C75.63 90.66 75.21 91.05 74.77 91.44L74.68 91.52C74.22 91.93 73.75 92.34 73.26 92.74C72.34 93.5 71.37 94.24 70.37 94.97C71.5 95.79 74.15 97.62 77.03 99.43C81 102 81.6 102.47 84.07 103.87Z"
              fill="url(#paint1_linear_1_3)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_1_3"
              x1="66.42"
              y1="98"
              x2="40.03"
              y2="135.41"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3750E2" stopOpacity="0.6" />
              <stop offset="0.19" stopColor="#3851E7" stopOpacity="0.57" />
              <stop offset="0.21" stopColor="#3248DB" stopOpacity="0.51" />
              <stop offset="0.26" stopColor="#2535C1" stopOpacity="0.37" />
              <stop offset="0.31" stopColor="#1924AB" stopOpacity="0.26" />
              <stop offset="0.37" stopColor="#101799" stopOpacity="0.16" />
              <stop offset="0.44" stopColor="#090D8C" stopOpacity="0.09" />
              <stop offset="0.53" stopColor="#040582" stopOpacity="0.04" />
              <stop offset="0.65" stopColor="#01017D" stopOpacity="0.01" />
              <stop offset="0.98" stopColor="#00007B" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_1_3"
              x1="49.75"
              y1="95.91"
              x2="72.18"
              y2="73.07"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.05" stopColor="#3750E2" stopOpacity="0.6" />
              <stop offset="0.43" stopColor="#3851E7" stopOpacity="0.57" />
              <stop offset="0.44" stopColor="#364DE2" stopOpacity="0.55" />
              <stop offset="0.6" stopColor="#1F2CB6" stopOpacity="0.31" />
              <stop offset="0.74" stopColor="#0E1496" stopOpacity="0.14" />
              <stop offset="0.85" stopColor="#040582" stopOpacity="0.04" />
              <stop offset="0.92" stopColor="#00007B" stopOpacity="0" />
            </linearGradient>
            <clipPath id="clip0_1_3">
              <rect width="140" height="140" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    case 'velog':
      return (
        <svg width="18" height="18" viewBox="0 0 192 192" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 0H168C181.255 0 192 10.7451 192 24V168C192 181.255 181.255 192 168 192H24C10.7451 192 0 181.255 0 168V24C0 10.7451 10.7451 0 24 0ZM49 57.9199V65.48H67L80.6799 142.52L98.5 141.26C116.02 119.06 127.84 102.44 133.96 91.3999C140.2 80.24 143.32 70.9399 143.32 63.5C143.32 59.0601 142 55.7 139.36 53.4199C136.84 51.1399 133.66 50 129.82 50C122.62 50 116.62 53.0601 111.82 59.1799C116.5 62.3 119.68 64.8799 121.36 66.9199C123.16 68.8401 124.06 71.4199 124.06 74.6599C124.06 80.0601 122.44 86.1799 119.2 93.02C116.08 99.8601 112.66 105.92 108.94 111.2C106.54 114.56 103.48 118.7 99.76 123.62L88.0601 57.2C87.1001 52.3999 84.1001 50 79.0601 50C76.78 50 72.3999 50.96 65.9199 52.8799C59.4399 54.6799 53.8 56.3601 49 57.9199Z"
            fill="currentColor"
          ></path>
        </svg>
      )
  }
}

export default SvgStyle
