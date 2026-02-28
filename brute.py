import itertools

def evaluate(arr, pivot_strategy, comp_mode, partition_strategy):
    comps = [0]
    
    def qs(a, low, high):
        if low < high:
            if pivot_strategy == 'first':
                pidx = low
            elif pivot_strategy == 'last':
                pidx = high
            elif pivot_strategy == 'mid':
                pidx = low + (high - low) // 2
            
            p = a[pidx]
            
            if partition_strategy == 'lomuto':
                a[pidx], a[high] = a[high], a[pidx]
                p = a[high]
                i = low - 1
                for j in range(low, high):
                    if 'lomuto_compare' in comp_mode: comps[0] += 1
                    if 'lomuto_compare_plus' in comp_mode: comps[0] += 2
                    if a[j] < p:
                        i += 1
                        a[i], a[j] = a[j], a[i]
                        if 'lomuto_swap' in comp_mode: comps[0] += 1
                a[i+1], a[high] = a[high], a[i+1]
                if 'lomuto_swap' in comp_mode: comps[0] += 1
                if 'lomuto_part_size' in comp_mode: comps[0] += (high - low)
                pi = i + 1
                qs(a, low, pi - 1)
                qs(a, pi + 1, high)
                
            elif partition_strategy == 'hoare':
                # varying the exact hoare implementation
                i = low - 1
                j = high + 1
                while True:
                    if 'hoare_outer_loop' in comp_mode: comps[0] += 1
                    i += 1
                    if 'hoare_compare' in comp_mode: comps[0] += 1
                    while a[i] < p:
                        if 'hoare_compare_inner' in comp_mode: comps[0] += 1
                        i += 1
                        
                    j -= 1
                    if 'hoare_compare' in comp_mode: comps[0] += 1
                    while a[j] > p:
                        if 'hoare_compare_inner' in comp_mode: comps[0] += 1
                        j -= 1
                        
                    if i >= j:
                        pi = j
                        break
                    a[i], a[j] = a[j], a[i]
                    if 'hoare_swap' in comp_mode: comps[0] += 1
                qs(a, low, pi)
                qs(a, pi + 1, high)

    arr_copy = arr.copy()
    qs(arr_copy, 0, len(arr)-1)
    return comps[0]

arr1 = [15, -12, 9, -2, 6, 3, 0]
arr2 = [18, -20, 6, -9]

pivot_strategies = ['first', 'last', 'mid']
partition_strategies = ['lomuto', 'hoare']
comp_modes = [
    ['lomuto_compare'], ['lomuto_swap'], ['lomuto_part_size'],
    ['hoare_compare'], ['hoare_compare_inner'], ['hoare_swap'],
    ['hoare_compare', 'hoare_compare_inner']
]

for ps in pivot_strategies:
    for pts in partition_strategies:
        for cm in comp_modes:
            c1 = evaluate(arr1, ps, cm, pts)
            c2 = evaluate(arr2, ps, cm, pts)
            if c1 == 6 and c2 == 2:
                print(f"MATCH: {ps}, {pts}, {cm}")

print("Brute force completed.")
