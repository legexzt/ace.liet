def test_bizarre():
    arr1 = [15, -12, 9, -2, 6, 3, 0]
    arr2 = [18, -20, 6, -9]

    def count_comparisons(arr, pivot_type, cond):
        comps = [0]
        def qs(a, l, h):
            if l < h:
                m = l + (h - l) // 2
                if pivot_type == 'mid': p = a[m]
                elif pivot_type == 'first': p = a[l]
                elif pivot_type == 'last': p = a[h]

                i, j = l, h
                while i <= j:
                    if cond == 'once_per_outer': comps[0] += 1
                    while a[i] < p:
                        if cond == 'every_inner': comps[0] += 1
                        i += 1
                    while a[j] > p:
                        if cond == 'every_inner': comps[0] += 1
                        j -= 1
                    if i <= j:
                        a[i], a[j] = a[j], a[i]
                        if cond == 'on_swap': comps[0] += 1
                        i += 1
                        j -= 1
                qs(a, l, j)
                qs(a, i, h)
        qs(arr.copy(), 0, len(arr)-1)
        return comps[0]

    for pt in ['mid', 'first', 'last']:
        for cond in ['once_per_outer', 'every_inner', 'on_swap']:
            c1 = count_comparisons(arr1, pt, cond)
            c2 = count_comparisons(arr2, pt, cond)
            if c1 == 6 and c2 == 2:
                print(f"MATCH: pt={pt}, cond={cond}")
            else:
                pass
                #print(f"{pt}, {cond} -> {c1}, {c2}")

test_bizarre()
