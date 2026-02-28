def test_qsort_counts():
    arr1 = [15, -12, 9, -2, 6, 3, 0]
    arr2 = [18, -20, 6, -9]

    def count_comparisons_lomuto(arr):
        comps = [0]
        def qs(a, low, high):
            if low < high:
                pivot = a[high]
                i = low - 1
                for j in range(low, high):
                    comps[0] += 1
                    if a[j] < pivot:
                        i += 1
                        a[i], a[j] = a[j], a[i]
                a[i+1], a[high] = a[high], a[i+1]
                pi = i + 1
                qs(a, low, pi - 1)
                qs(a, pi + 1, high)
        qs(arr.copy(), 0, len(arr)-1)
        return comps[0]

    def count_comparisons_hoare(arr):
        comps = [0]
        def qs(a, low, high):
            if low < high:
                pivot = a[low]
                i = low - 1
                j = high + 1
                while True:
                    i += 1
                    comps[0] += 1
                    while a[i] < pivot:
                        comps[0] += 1
                        i += 1
                    j -= 1
                    comps[0] += 1
                    while a[j] > pivot:
                        comps[0] += 1
                        j -= 1
                    if i >= j:
                        pi = j
                        break
                    a[i], a[j] = a[j], a[i]
                qs(a, low, pi)
                qs(a, pi + 1, high)
        qs(arr.copy(), 0, len(arr)-1)
        return comps[0]
        
    def count_comparisons_mid_pivot_hoare(arr):
        comps = [0]
        def qs(a, l, h):
            if l < h:
                m = l + (h - l) // 2
                p = a[m]
                i, j = l, h
                while i <= j:
                    comps[0] += 1
                    while a[i] < p:
                        comps[0] += 1
                        i += 1
                    comps[0] += 1
                    while a[j] > p:
                        comps[0] += 1
                        j -= 1
                    if i <= j:
                        a[i], a[j] = a[j], a[i]
                        i += 1; j -= 1
                qs(a, l, j)
                qs(a, i, h)
        qs(arr.copy(), 0, len(arr)-1)
        return comps[0]

    print(f"Lomuto: arr1={count_comparisons_lomuto(arr1)}, arr2={count_comparisons_lomuto(arr2)}")
    print(f"Hoare: arr1={count_comparisons_hoare(arr1)}, arr2={count_comparisons_hoare(arr2)}")
    print(f"Mid Pivot Hoare: arr1={count_comparisons_mid_pivot_hoare(arr1)}, arr2={count_comparisons_mid_pivot_hoare(arr2)}")

test_qsort_counts()
