#ifndef DSAP_ALGORITHMS_H
#define DSAP_ALGORITHMS_H

#include <cmath>
#include "config.h"

typedef struct {
    double real;
    double imag;
} complex;

complex cproduct(complex z1, complex z2) {
    complex res;
    res.real = z1.real * z2.real - z1.imag * z2.imag;
    res.imag = z1.real * z2.imag + z1.imag * z2.real;
    return res;
}

complex cdivz(complex z, int n) {
    complex res;
    res.real = z.real / n;
    res.imag = z.imag / n;
    return res;
}

complex csum(complex z1, complex z2) {
    complex res;
    res.real = z1.real + z2.real;
    res.imag = z1.imag + z2.imag;
    return res;
}

complex csub(complex z1, complex z2) {
    complex res;
    res.real = z1.real - z2.real;
    res.imag = z1.imag - z2.imag;
    return res;
}

void swap(complex *a, complex *b) {
    complex temp = *a;
    *a = *b;
    *b = temp;
}

complex wlen_pw[I2S_DMA_BUF_LEN];

//0 - forward, 1 - backward(invert)
void fft(complex *a, int n, int invert) {

    for (int i = 1, j = 0; i < n; ++i) {
        int bit = n >> 1;
        for (; j >= bit; bit >>= 1)
            j -= bit;
        j += bit;
        if (i < j)
            swap(&a[i], &a[j]);
    }

    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * M_PI / len * (invert ? -1 : 1);
        int len2 = len >> 1;

        complex wlen = {cos(ang), sin(ang)};
        wlen_pw[0] = (complex) {1, 0};
        for (int i = 1; i < len2; ++i)
            wlen_pw[i] = cproduct(wlen_pw[i - 1], wlen);

        for (int i = 0; i < n; i += len) {
            complex t,
                    *pu = a + i,
                    *pv = a + i + len2,
                    *pu_end = a + i + len2,
                    *pw = wlen_pw;
            for (; pu != pu_end; ++pu, ++pv, ++pw) {
                t = cproduct(*pv, *pw);
                *pv = csub(*pu, t);
                *pu = csum(*pu, t);
            }
        }




//    for (int b = 1; b < n; b <<= 1) {
//        double ang = M_PI / b * (invert ? -1 : +1);
//        complex wlen = {cos(ang), sin(ang)};
//        for (int i = 0; i < n; i += b << 1) {
//            complex w = {1, 0};
//            for (int k = 0; k < b; ++k) {
//                complex u = a[i + k];
//                complex v = cproduct(a[i + k + b], w);
//                a[i + k] = csum(u, v);
//                a[i + k + b] = csub(u, v);
//                w = cproduct(w, wlen);
//            }
//        }




//    for (int b = 2; b <= n; b <<= 1) {
//        double ang = 2*M_PI / b * (invert ? -1 : +1);
//        complex wlen = {cos(ang), sin(ang)};
//        for (int i = 0; i < n; i += b) {
//            complex w = {1, 0};
//            for (int k = 0; k < b/2; ++k) {
//                complex u = a[i + k];
//                complex v = cproduct(a[i + k + b/2], w);
//                a[i + k] = csum(u, v);
//                a[i + k + b/2] = csub(u, v);
//                w = cproduct(w, wlen);
//            }
//        }




        //        for (int i = 0; i < n; i += b << 1) {
//
//            for (int k = 0; k < b; k++) {
//                if (invert == 0) {
//                    complex temp = a[i + k];
//                    a[i + k] = csum(a[i + k], cproduct(w_arr[b + k], a[i + b + k]));
//                    a[i + b + k] = csub(temp, cproduct(w_arr[b + k], a[i + b + k]));
//                } else {
//                    complex w = w_arr[b + k];
//                    w.imag = -w.imag;
//                    complex temp = a[i + k];
//                    a[i + k] = csum(a[i + k], cproduct(w, a[i + b + k]));
//                    a[i + b + k] = csub(temp, cproduct(w, a[i + b + k]));
//                }
//            }
//        }

    }
    if (invert == 1)
        for (int i = 0; i < n; i++) {
            a[i] = cdivz(a[i], n);
        }
}

#endif
