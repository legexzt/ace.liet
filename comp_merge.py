def test_merge_steps():
    # 7 \n 38 27 43 3 9 82 10 -> 26
    # 6 \n 8 7 4 2 9 1 -> 21
    
    divs = [0]
    merges = [0]
    
    def merge(arr, l, m, r):
        n1 = m - l + 1
        n2 = r - m
        L = [0] * n1
        R = [0] * n2
        for i in range(0, n1):
            L[i] = arr[l + i]
        for j in range(0, n2):
            R[j] = arr[m + 1 + j]
            
        i = 0
        j = 0
        k = l
        while i < n1 and j < n2:
            merges[0] += 1
            if L[i] <= R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
            
        while i < n1:
            merges[0] += 1
            arr[k] = L[i]
            i += 1
            k += 1
            
        while j < n2:
            merges[0] += 1
            arr[k] = R[j]
            j += 1
            k += 1

    def mergeSort(arr, l, r):
        # Depending on how divide is counted.
        # Usually divide is counted for each valid partition or each split.
        if l < r:
            divs[0] += 1
            m = l + (r - l) // 2
            mergeSort(arr, l, m)
            mergeSort(arr, m + 1, r)
            merge(arr, l, m, r)

    arr1 = [38, 27, 43, 3, 9, 82, 10]
    divs[0] = 0; merges[0] = 0
    mergeSort(arr1, 0, len(arr1)-1)
    print(f"n=7: divs={divs[0]}, merges={merges[0]}, total={divs[0]+merges[0]}")
    
    arr2 = [8, 7, 4, 2, 9, 1]
    divs[0] = 0; merges[0] = 0
    mergeSort(arr2, 0, len(arr2)-1)
    print(f"n=6: divs={divs[0]}, merges={merges[0]}, total={divs[0]+merges[0]}")

test_merge_steps()
