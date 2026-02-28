def test_swaps():
    arr1 = [15, -12, 9, -2, 6, 3, 0]
    arr2 = [18, -20, 6, -9]
    def qs(a, l, h, comps):
        if l < h:
            m = l + (h - l) // 2
            p = a[m]
            i, j = l, h
            while i <= j:
                while a[i] < p:
                    i += 1
                while a[j] > p:
                    j -= 1
                if i <= j:
                    a[i], a[j] = a[j], a[i]
                    comps[0] += 1
                    i += 1
                    j -= 1
            qs(a, l, j, comps)
            qs(a, i, h, comps)

    c1 = [0]
    qs(arr1.copy(), 0, len(arr1)-1, c1)
    c2 = [0]
    qs(arr2.copy(), 0, len(arr2)-1, c2)
    print(f"Mid Pivot Swaps: c1={c1[0]}, c2={c2[0]}")

test_swaps()
