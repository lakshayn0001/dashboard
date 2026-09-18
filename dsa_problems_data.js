// DSA Master Problem Database
// Curated specifically for Lakshay Nagpal's interview preparation

const DSA_TOPICS_DATA = [
  {
    "topic": "Arrays",
    "description": "Fundamental array manipulations, prefix sums, Kadane's algorithm, and in-place transformations.",
    "icon": "grid",
    "problems": [
      [
        "Two Sum",
        1,
        "two-sum",
        "Easy",
        "Hash Map Complement",
        [
          "Google",
          "Amazon",
          "Meta",
          "Apple",
          "Microsoft"
        ],
        "Knowing x determines needed complement = target - x. Check if seen before in O(1).",
        "Iterate nums. Compute complement = target - num. If complement in hash map return [map[complement], i], else map[num] = i.",
        "O(N)",
        "O(N)",
        "Using the same element twice. Check map before inserting current index."
      ],
      [
        "Best Time to Buy and Sell Stock",
        121,
        "best-time-to-buy-and-sell-stock",
        "Easy",
        "Prefix Minimum Greedy",
        [
          "Amazon",
          "Microsoft",
          "Google",
          "Apple",
          "Uber"
        ],
        "You can only sell in the future. Track the lowest buy price seen so far as you traverse.",
        "Track min_price and max_profit. For each price: min_price = min(min_price, price); max_profit = max(max_profit, price - min_price).",
        "O(N)",
        "O(1)",
        "Do not look for global minimum first, as it could occur after the peak."
      ],
      [
        "Contains Duplicate",
        217,
        "contains-duplicate",
        "Easy",
        "Hash Set Membership",
        [
          "Apple",
          "Amazon",
          "Microsoft"
        ],
        "Sets enforce uniqueness. If adding fails or item is in set, duplicate exists.",
        "seen = set(). For x in nums: if x in seen return True, else seen.add(x). Return False.",
        "O(N)",
        "O(N)",
        "Sorting takes O(N log N); HashSet achieves linear O(N)."
      ],
      [
        "Product of Array Except Self",
        238,
        "product-of-array-except-self",
        "Medium",
        "Prefix & Suffix Products",
        [
          "Amazon",
          "Meta",
          "Microsoft",
          "Apple",
          "Google"
        ],
        "res[i] = (product of elements before i) * (product of elements after i). Compute without division in two passes.",
        "First pass: fill res with prefix products left-to-right. Second pass: sweep right-to-left with running suffix product accumulator.",
        "O(N)",
        "O(1) aux",
        "Division by zero when array contains 0s. Problem forbids division."
      ],
      [
        "Maximum Subarray",
        53,
        "maximum-subarray",
        "Medium",
        "Kadane's Algorithm",
        [
          "Amazon",
          "Microsoft",
          "Google",
          "Apple",
          "LinkedIn"
        ],
        "A negative running prefix sum only degrades any future subarray. Discard it immediately.",
        "cur_sum = 0, max_sum = nums[0]. For x in nums: cur_sum = max(x, cur_sum + x); max_sum = max(max_sum, cur_sum).",
        "O(N)",
        "O(1)",
        "When all numbers are negative, initializing max_sum to 0 gives incorrect 0 instead of max negative."
      ],
      [
        "Maximum Product Subarray",
        152,
        "maximum-product-subarray",
        "Medium",
        "Min/Max Dynamic State",
        [
          "Google",
          "Amazon",
          "LinkedIn",
          "Microsoft"
        ],
        "Multiplying by a negative number flips minimum into maximum. Maintain both min and max running products.",
        "If num < 0, swap cur_max and cur_min. cur_max = max(x, cur_max*x), cur_min = min(x, cur_min*x). Update global max.",
        "O(N)",
        "O(1)",
        "Zeros reset the running product; handled cleanly by comparing with current element x."
      ],
      [
        "Find Minimum in Rotated Sorted Array",
        153,
        "find-minimum-in-rotated-sorted-array",
        "Medium",
        "Binary Search",
        [
          "Meta",
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "Compare mid with right. If nums[mid] > nums[right], inflection point is in right half.",
        "l = 0, r = len(nums)-1. While l < r: mid = (l+r)//2. If nums[mid] > nums[r]: l = mid + 1; else: r = mid. Return nums[l].",
        "O(log N)",
        "O(1)",
        "Comparing mid with left is ambiguous when array isn't rotated. Always compare with right."
      ],
      [
        "Search in Rotated Sorted Array",
        33,
        "search-in-rotated-sorted-array",
        "Medium",
        "Binary Search on Sorted Half",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft",
          "Apple",
          "Uber"
        ],
        "At least one half is always strictly sorted. Identify which half is sorted, check if target falls in it.",
        "If nums[l] <= nums[mid], left half is sorted. Check if nums[l] <= target < nums[mid]; adjust pointers accordingly.",
        "O(log N)",
        "O(1)",
        "Strict vs non-strict inequality on boundary checks."
      ],
      [
        "3Sum",
        15,
        "3sum",
        "Medium",
        "Sort + Two Pointers",
        [
          "Meta",
          "Amazon",
          "Apple",
          "Google",
          "Microsoft",
          "Uber"
        ],
        "Sort array. Fix nums[i], then use two pointers on right subarray to find pair summing to -nums[i].",
        "Sort nums. For i in 0..N-3: skip duplicates (nums[i] == nums[i-1]). l = i+1, r = N-1. If sum == 0: record triplet, advance both pointers while skipping duplicates.",
        "O(N^2)",
        "O(1) aux",
        "Duplicate triplets. Must advance pointers past equal values for i, l, and r."
      ],
      [
        "Container With Most Water",
        11,
        "container-with-most-water",
        "Medium",
        "Greedy Two Pointers",
        [
          "Amazon",
          "Google",
          "Meta",
          "Adobe",
          "Apple"
        ],
        "Area is constrained by shorter wall. Moving taller wall inward can only decrease area. Move shorter wall.",
        "l = 0, r = N-1. While l < r: update max_area with (r - l) * min(h[l], h[r]). Increment l if h[l] < h[r] else decrement r.",
        "O(N)",
        "O(1)",
        "Moving taller pointer is guaranteed sub-optimal."
      ],
      [
        "Majority Element",
        169,
        "majority-element",
        "Easy",
        "Boyer-Moore Voting",
        [
          "Amazon",
          "Google",
          "Microsoft",
          "Apple"
        ],
        "Majority element occurs > N/2 times. Cancel out differing elements; majority element always survives.",
        "count = 0, candidate = None. For x in nums: if count == 0 candidate = x; count += (1 if x == candidate else -1).",
        "O(N)",
        "O(1)",
        "Assumes majority element guaranteed. If not, second verification pass required."
      ],
      [
        "Missing Number",
        268,
        "missing-number",
        "Easy",
        "Gauss Math / Bitwise XOR",
        [
          "Amazon",
          "Microsoft",
          "Apple"
        ],
        "Expected sum of 0..n is n*(n+1)/2. Missing number is expected - actual. XOR indices and values to avoid overflow.",
        "n = len(nums); return n * (n + 1) // 2 - sum(nums).",
        "O(N)",
        "O(1)",
        "Integer overflow in 32-bit languages when n is huge. Bitwise XOR avoids overflow."
      ],
      [
        "Find All Numbers Disappeared in an Array",
        448,
        "find-all-numbers-disappeared-in-an-array",
        "Easy",
        "In-Place Index Negation",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Values 1..n map to indices 0..n-1. Negate the number at index abs(val) - 1 to mark presence.",
        "For x in nums: idx = abs(x) - 1; if nums[idx] > 0: nums[idx] = -nums[idx]. Second pass: collect i + 1 where nums[i] > 0.",
        "O(N)",
        "O(1) aux",
        "Must use abs(x) because value at x may have been negated by an earlier visit."
      ],
      [
        "Merge Sorted Array",
        88,
        "merge-sorted-array",
        "Easy",
        "Reverse Three Pointers",
        [
          "Meta",
          "Amazon",
          "Microsoft",
          "Bloomberg"
        ],
        "nums1 has free space at the end. Merge from index m + n - 1 backwards to avoid overwriting.",
        "p1 = m - 1, p2 = n - 1, p = m + n - 1. While p2 >= 0: if p1 >= 0 and nums1[p1] > nums2[p2]: nums1[p] = nums1[p1]; p1 -= 1; else: nums1[p] = nums2[p2]; p2 -= 1; p -= 1.",
        "O(M + N)",
        "O(1)",
        "Only loop while p2 >= 0; remaining nums1 elements are already in sorted place."
      ],
      [
        "Rotate Array",
        189,
        "rotate-array",
        "Medium",
        "Three-Pass Array Reversal",
        [
          "Amazon",
          "Microsoft",
          "Meta"
        ],
        "Reversing the whole array, then first k, then remaining n-k moves the last k elements to front.",
        "k %= len(nums). reverse(nums, 0, n-1); reverse(nums, 0, k-1); reverse(nums, k, n-1).",
        "O(N)",
        "O(1)",
        "k >= n; always take k %= len(nums)."
      ]
    ]
  },
  {
    "topic": "Strings",
    "description": "String parsing, anagrams, palindromes, sliding window substrings, and serialization.",
    "icon": "type",
    "problems": [
      [
        "Valid Anagram",
        242,
        "valid-anagram",
        "Easy",
        "Frequency Array",
        [
          "Amazon",
          "Bloomberg",
          "Google"
        ],
        "Anagrams must have identical character counts. Use a 26-int frequency buffer.",
        "If len(s) != len(t) return False. Increment for chars in s, decrement for t. Verify all zeroes.",
        "O(N)",
        "O(1)",
        "Unicode strings require HashMap instead of fixed 26 array."
      ],
      [
        "Valid Palindrome",
        125,
        "valid-palindrome",
        "Easy",
        "Two Pointers with Filtering",
        [
          "Meta",
          "Amazon",
          "Microsoft",
          "Apple"
        ],
        "Scan from both ends inward, ignoring non-alphanumeric chars and case.",
        "l = 0, r = len(s)-1. Advance l past non-alphanumeric, retreat r past non-alphanumeric. Compare lowercase. Advance.",
        "O(N)",
        "O(1)",
        "Inner skipping loops must check l < r to avoid index errors."
      ],
      [
        "Longest Common Prefix",
        14,
        "longest-common-prefix",
        "Easy",
        "Vertical Scanning",
        [
          "Amazon",
          "Apple",
          "Google"
        ],
        "Compare characters column by column across all strings. Stop at first mismatch.",
        "Use strs[0] as pivot. For col in 0..len(strs[0])-1: check if all strings have same char at col. If not, slice strs[0][:col].",
        "O(S)",
        "O(1)",
        "Empty array strs = [] or single-string inputs."
      ],
      [
        "Longest Substring Without Repeating Characters",
        3,
        "longest-substring-without-repeating-characters",
        "Medium",
        "Sliding Window + Last Seen Map",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft",
          "Bloomberg",
          "Apple"
        ],
        "Window [l..r]. If s[r] seen at idx >= l, jump l to idx + 1 to eliminate the duplicate.",
        "seen = {}; l = 0, max_len = 0. For r, c in enumerate(s): if c in seen and seen[c] >= l: l = seen[c] + 1; seen[c] = r; max_len = max(max_len, r - l + 1).",
        "O(N)",
        "O(min(N, Alphabet))",
        "Must check seen[c] >= l; otherwise left pointer could jump backward."
      ],
      [
        "Longest Repeating Character Replacement",
        424,
        "longest-repeating-character-replacement",
        "Medium",
        "Sliding Window Max Frequency",
        [
          "Google",
          "Amazon",
          "Uber"
        ],
        "Window is valid if (window_size - max_frequency) <= k. Otherwise shrink from left.",
        "counts = defaultdict(int); max_f = 0, l = 0, res = 0. Expand r: update counts and max_f. While (r - l + 1) - max_f > k: decrement counts[s[l]], l += 1. res = max(res, r - l + 1).",
        "O(N)",
        "O(1)",
        "max_f does not need decrementing when shrinking; a non-decreasing max_f finds global maximum."
      ],
      [
        "Group Anagrams",
        49,
        "group-anagrams",
        "Medium",
        "Canonical Tuple Hash Key",
        [
          "Amazon",
          "Meta",
          "Google",
          "Apple",
          "Microsoft"
        ],
        "All anagrams sort to identical string or share 26-element character count tuple.",
        "groups = defaultdict(list). For s in strs: key = tuple(sorted(s)); groups[key].append(s). Return list(groups.values()).",
        "O(N * K log K)",
        "O(N * K)",
        "Using mutable list as map key in Python; must convert to tuple or string."
      ],
      [
        "Valid Parentheses",
        20,
        "valid-parentheses",
        "Easy",
        "LIFO Stack Matching",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft",
          "LinkedIn"
        ],
        "Most recently opened bracket must be first closed. Push openers, pop and verify closures.",
        "stack = []; pairs = {')': '(', '}': '{', ']': '['}. If char in pairs: if not stack or stack.pop() != pairs[char]: return False; else stack.append(char). Return not stack.",
        "O(N)",
        "O(N)",
        "Empty stack on pop, or leftover open brackets at end."
      ],
      [
        "Minimum Window Substring",
        76,
        "minimum-window-substring",
        "Hard",
        "Sliding Window Two HashMaps",
        [
          "Meta",
          "Amazon",
          "Google",
          "Uber",
          "Airbnb"
        ],
        "Expand right until all chars of t are matched. Then shrink left to find minimal valid window.",
        "Maintain target counts and current window counts. Track 'formed' unique matches. When formed == required, record min length, shrink left, update formed, l++.",
        "O(N + M)",
        "O(Alphabet)",
        "Comparing total char count instead of unique char count matching threshold."
      ],
      [
        "Permutation in String",
        567,
        "permutation-in-string",
        "Medium",
        "Fixed Size Sliding Window",
        [
          "Microsoft",
          "Meta",
          "Amazon"
        ],
        "Permutation of s1 in s2 means a contiguous window of length len(s1) has matching char counts.",
        "Initialize 26-int count arrays for s1 and first window of s2. Slide window across s2 adding right and dropping left char in O(1).",
        "O(len(s2))",
        "O(1)",
        "If len(s1) > len(s2), return False immediately."
      ],
      [
        "String to Integer (atoi)",
        8,
        "string-to-integer-atoi",
        "Medium",
        "State Machine Parser",
        [
          "Microsoft",
          "Amazon",
          "Google"
        ],
        "Parse whitespace -> optional sign -> digits accumulation -> clamp to 32-bit signed range [-2^31, 2^31 - 1].",
        "Skip spaces. Check +/-. Iterate digits: val = val * 10 + digit. Clamp between INT_MIN and INT_MAX.",
        "O(N)",
        "O(1)",
        "Overflow during multiplication in static typed languages."
      ],
      [
        "Longest Palindromic Substring",
        5,
        "longest-palindromic-substring",
        "Medium",
        "Expand Around Centers",
        [
          "Amazon",
          "Meta",
          "Microsoft",
          "Google"
        ],
        "Palindromes expand outward from center. Test 2N - 1 centers (single char and two char centers).",
        "For i in 0..N-1: expand(i, i) and expand(i, i+1). Track longest range found.",
        "O(N^2)",
        "O(1)",
        "Even-length palindromes like 'abba' where center is between characters."
      ],
      [
        "Encode and Decode Strings",
        271,
        "encode-and-decode-strings",
        "Medium",
        "Length-Prefix Framing",
        [
          "Google",
          "Meta",
          "Amazon"
        ],
        "Delimiters can occur inside strings. Prefix each string with its length and a sentinel: '4#leet4#code'.",
        "Encode: join f'{len(s)}#{s}' for s in strs. Decode: read digits until '#', extract substring of that length, repeat.",
        "O(Total Chars)",
        "O(1) aux",
        "Strings containing '#' or numbers are handled unambiguously by length prefix."
      ]
    ]
  },
  {
    "topic": "Hashing",
    "description": "Constant time lookup, grouping, frequency counting, and hash set uniqueness.",
    "icon": "hash",
    "problems": [
      [
        "Two Sum",
        1,
        "two-sum",
        "Easy",
        "Hash Map Complement",
        [
          "Google",
          "Amazon",
          "Meta"
        ],
        "Lookup complement = target - num in O(1).",
        "Check if target - num in map. If so return indices; else map[num] = index.",
        "O(N)",
        "O(N)",
        "Using same element twice."
      ],
      [
        "Contains Duplicate",
        217,
        "contains-duplicate",
        "Easy",
        "Hash Set",
        [
          "Apple",
          "Microsoft"
        ],
        "Set stores seen values. Immediate return on collision.",
        "seen = set(); for x in nums: if x in seen: return True; seen.add(x).",
        "O(N)",
        "O(N)",
        "Space vs time trade-off."
      ],
      [
        "Group Anagrams",
        49,
        "group-anagrams",
        "Medium",
        "Canonical Hash Key",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Group words by sorted character string or 26-count tuple.",
        "map[tuple(sorted(word))].append(word). Return map values.",
        "O(N * K log K)",
        "O(N * K)",
        "List keys cannot be hashed in Python."
      ],
      [
        "Top K Frequent Elements",
        347,
        "top-k-frequent-elements",
        "Medium",
        "Bucket Sort / Min-Heap",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Count frequencies. Bucket sort by frequency (max freq is N) to achieve O(N) linear time without heap.",
        "counts = Counter(nums). buckets = [[] for _ in range(N+1)]. Place num in buckets[freq]. Collect from back until k elements.",
        "O(N)",
        "O(N)",
        "Heap approach is O(N log K); Bucket Sort is pure O(N)."
      ],
      [
        "Longest Consecutive Sequence",
        128,
        "longest-consecutive-sequence",
        "Medium",
        "Hash Set Sequence Start",
        [
          "Google",
          "Amazon",
          "Meta",
          "Microsoft"
        ],
        "Only start counting sequence from numbers that are sequence starts (i.e. num - 1 not in set).",
        "num_set = set(nums). For x in num_set: if x - 1 not in num_set: count up x + 1, x + 2... Track max length.",
        "O(N)",
        "O(N)",
        "Counting from every number yields O(N^2); only count from sequence start gives O(N)."
      ],
      [
        "Subarray Sum Equals K",
        560,
        "subarray-sum-equals-k",
        "Medium",
        "Prefix Sum + Hash Map",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "If prefix_sum[j] - prefix_sum[i] = k, then prefix_sum[i] = prefix_sum[j] - k. Count how many times this prefix occurred.",
        "prefix_counts = {0: 1}. cur_sum = 0, res = 0. For x in nums: cur_sum += x; res += prefix_counts.get(cur_sum - k, 0); prefix_counts[cur_sum] = prefix_counts.get(cur_sum, 0) + 1.",
        "O(N)",
        "O(N)",
        "Must initialize prefix_counts with {0: 1} to account for subarrays starting at index 0."
      ],
      [
        "Isomorphic Strings",
        205,
        "isomorphic-strings",
        "Easy",
        "Bi-directional Character Mapping",
        [
          "Amazon",
          "Google",
          "LinkedIn"
        ],
        "Both s -> t and t -> s mappings must be strictly one-to-one and injective.",
        "Use two maps s_to_t and t_to_s. For c1, c2 in zip(s, t): if c1 in s_to_t and s_to_t[c1] != c2: return False. Same for t_to_s.",
        "O(N)",
        "O(Alphabet)",
        "Mapping 'ab' to 'aa' fails if you only check one direction."
      ],
      [
        "Happy Number",
        202,
        "happy-number",
        "Easy",
        "Floyd's Cycle Detection / Set",
        [
          "Amazon",
          "Google",
          "Uber"
        ],
        "Sum of squares of digits either reaches 1 or enters an infinite cycle (like 4 -> 16 -> 37 -> ...).",
        "seen = set(). While n != 1 and n not in seen: seen.add(n); n = sum(int(d)**2 for d in str(n)). Return n == 1.",
        "O(log N)",
        "O(log N)",
        "Infinite loops; cycle detection is essential."
      ],
      [
        "Four Sum II",
        454,
        "4sum-ii",
        "Medium",
        "Meet in the Middle Hash Map",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Divide 4 arrays into two pairs of 2. Compute all sums of A + B in O(N^2) hash map, then query with -(C + D).",
        "map_ab = Counter(a + b for a in A for b in B). Return sum(map_ab[-(c + d)] for c in C for d in D).",
        "O(N^2)",
        "O(N^2)",
        "Brute force O(N^4) will TLE; meet-in-the-middle reduces to O(N^2)."
      ],
      [
        "First Missing Positive",
        41,
        "first-missing-positive",
        "Hard",
        "Cyclic In-Place Sort",
        [
          "Amazon",
          "Google",
          "Microsoft",
          "Meta"
        ],
        "Answer must be in 1..n+1. Place each number x at its ideal index x - 1 using swaps.",
        "While i < n: correct_idx = nums[i] - 1. If 1 <= nums[i] <= n and nums[i] != nums[correct_idx]: swap(nums[i], nums[correct_idx]). Else i += 1. Second pass: first i where nums[i] != i + 1.",
        "O(N)",
        "O(1)",
        "Infinite swap loops when nums[i] == nums[correct_idx]. Check for duplicate before swapping."
      ]
    ]
  },
  {
    "topic": "Two Pointers",
    "description": "Opposite-end convergence, fast and slow runners, and in-place partitioning.",
    "icon": "arrows-horizontal",
    "problems": [
      [
        "Valid Palindrome",
        125,
        "valid-palindrome",
        "Easy",
        "Converging Two Pointers",
        [
          "Meta",
          "Amazon"
        ],
        "Pointers converge from ends toward center, comparing valid characters.",
        "l = 0, r = n - 1. Skip non-alphanumerics. Compare s[l].lower() == s[r].lower().",
        "O(N)",
        "O(1)",
        "Off-by-one errors when skipping."
      ],
      [
        "Two Sum II - Input Array Is Sorted",
        167,
        "two-sum-ii-input-array-is-sorted",
        "Medium",
        "Sorted Two Pointers",
        [
          "Amazon",
          "Google",
          "Apple"
        ],
        "Array is sorted. If sum < target, advance left to increase sum. If sum > target, retreat right.",
        "l = 0, r = n - 1. While l < r: s = nums[l] + nums[r]. If s == target return [l+1, r+1]; elif s < target: l += 1; else: r -= 1.",
        "O(N)",
        "O(1)",
        "1-based index return requirement in problem specification."
      ],
      [
        "3Sum",
        15,
        "3sum",
        "Medium",
        "Sort + Converging Pointers",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Fix one element, use Two Sum II on the remainder.",
        "Sort, iterate i. l = i+1, r = n-1. Skip duplicates.",
        "O(N^2)",
        "O(1) aux",
        "Duplicate triplets."
      ],
      [
        "Container With Most Water",
        11,
        "container-with-most-water",
        "Medium",
        "Greedy Shrinking Pointers",
        [
          "Amazon",
          "Google"
        ],
        "Always move the shorter boundary inward.",
        "l = 0, r = n-1. area = (r-l)*min(h[l], h[r]). Move shorter.",
        "O(N)",
        "O(1)",
        "Moving taller boundary never increases area."
      ],
      [
        "Trapping Rain Water",
        42,
        "trapping-rain-water",
        "Hard",
        "Two Pointers Max Boundaries",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft",
          "Apple",
          "Goldman Sachs"
        ],
        "Water trapped above index i depends on min(max_left, max_right) - height[i]. Advance whichever side has smaller max.",
        "l = 0, r = n-1, max_l = 0, max_r = 0, water = 0. While l < r: if height[l] < height[r]: if height[l] >= max_l: max_l = height[l]; else: water += max_l - height[l]; l += 1; else: if height[r] >= max_r: max_r = height[r]; else: water += max_r - height[r]; r -= 1.",
        "O(N)",
        "O(1)",
        "Confusing current height with running max height."
      ],
      [
        "Remove Duplicates from Sorted Array",
        26,
        "remove-duplicates-from-sorted-array",
        "Easy",
        "Slow & Fast Pointers",
        [
          "Microsoft",
          "Amazon",
          "Apple"
        ],
        "Slow pointer tracks write position for unique elements. Fast pointer scans.",
        "write = 1. For fast in 1..n-1: if nums[fast] != nums[fast - 1]: nums[write] = nums[fast]; write += 1. Return write.",
        "O(N)",
        "O(1)",
        "Empty array or 1-element array edge cases."
      ],
      [
        "Move Zeroes",
        283,
        "move-zeroes",
        "Easy",
        "Slow & Fast Partitioning",
        [
          "Meta",
          "Amazon",
          "Apple",
          "Google"
        ],
        "Maintain non-zero boundary. Swap non-zero elements with slow pointer position.",
        "slow = 0. For fast in 0..n-1: if nums[fast] != 0: nums[slow], nums[fast] = nums[fast], nums[slow]; slow += 1.",
        "O(N)",
        "O(1)",
        "Do not overwrite values before moving; swap preserves zero count."
      ],
      [
        "Squares of a Sorted Array",
        977,
        "squares-of-a-sorted-array",
        "Easy",
        "Two Pointers from Ends",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Largest squared values are at the extreme left (negative numbers) or extreme right (positive numbers).",
        "l = 0, r = n - 1, p = n - 1, res = [0]*n. While l <= r: if abs(nums[l]) > abs(nums[r]): res[p] = nums[l]**2; l += 1; else: res[p] = nums[r]**2; r -= 1; p -= 1.",
        "O(N)",
        "O(N)",
        "Filling from index 0 upward requires sorting O(N log N); filling backwards is O(N)."
      ],
      [
        "Backspace String Compare",
        844,
        "backspace-string-compare",
        "Easy",
        "Reverse Two Pointers",
        [
          "Google",
          "Amazon"
        ],
        "Backspaces '#' affect preceding characters. Scan backwards from end of strings.",
        "p1 = len(s)-1, p2 = len(t)-1, skip1 = 0, skip2 = 0. Scan backwards, count '#' to skip characters, compare next valid chars.",
        "O(N + M)",
        "O(1)",
        "Stack solution uses O(N) space; reverse pointers achieves O(1) space."
      ],
      [
        "Sort Colors",
        75,
        "sort-colors",
        "Medium",
        "Dutch National Flag Partition",
        [
          "Amazon",
          "Microsoft",
          "Meta"
        ],
        "Three-way partition array into [0s], [1s], [2s] in a single pass.",
        "low = 0, mid = 0, high = n - 1. While mid <= high: if nums[mid] == 0: swap(low, mid), low++, mid++; elif nums[mid] == 1: mid++; else: swap(mid, high), high--.",
        "O(N)",
        "O(1)",
        "Do NOT increment mid when swapping with high, as swapped element from high must be inspected."
      ]
    ]
  },
  {
    "topic": "Sliding Window",
    "description": "Contiguous subarray optimization, dynamically expanding and contracting bounds.",
    "icon": "layout-sidebar-inset",
    "problems": [
      [
        "Maximum Average Subarray I",
        643,
        "maximum-average-subarray-i",
        "Easy",
        "Fixed Window Sum",
        [
          "Google",
          "Amazon"
        ],
        "Window of fixed size k. Moving window forward adds nums[i] and subtracts nums[i - k].",
        "cur_sum = sum(nums[:k]), max_sum = cur_sum. For i in k..n-1: cur_sum += nums[i] - nums[i-k]; max_sum = max(max_sum, cur_sum). Return max_sum / k.",
        "O(N)",
        "O(1)",
        "Recomputing sum from scratch inside loop makes it O(N*K) instead of O(N)."
      ],
      [
        "Longest Substring Without Repeating Characters",
        3,
        "longest-substring-without-repeating-characters",
        "Medium",
        "Dynamic Window",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Contract left pointer past last occurrence of duplicate char.",
        "Expand r, shrink l past duplicate. Track max(r - l + 1).",
        "O(N)",
        "O(min(N, Alphabet))",
        "Moving left pointer backward if index map is stale."
      ],
      [
        "Longest Repeating Character Replacement",
        424,
        "longest-repeating-character-replacement",
        "Medium",
        "Max Frequency Window",
        [
          "Google",
          "Amazon"
        ],
        "Window valid if window_len - max_freq <= k.",
        "Expand r, update max_f. If window_len - max_f > k, shrink l.",
        "O(N)",
        "O(1)",
        "Shrinking max_f is not required for optimal result."
      ],
      [
        "Permutation in String",
        567,
        "permutation-in-string",
        "Medium",
        "Fixed Size Window",
        [
          "Microsoft",
          "Meta"
        ],
        "Window of fixed size len(s1) must match char counts.",
        "Slide window of size len(s1) across s2, tracking character matches.",
        "O(len(s2))",
        "O(1)",
        "s1 longer than s2 edge case."
      ],
      [
        "Minimum Window Substring",
        76,
        "minimum-window-substring",
        "Hard",
        "Dynamic Window Two Counts",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Expand until all chars present, contract until minimal.",
        "Track formed unique characters. Contract left while valid.",
        "O(N + M)",
        "O(Alphabet)",
        "Comparing frequencies directly vs unique satisfied characters."
      ],
      [
        "Sliding Window Maximum",
        239,
        "sliding-window-maximum",
        "Hard",
        "Monotonic Deque",
        [
          "Google",
          "Amazon",
          "Meta",
          "Microsoft"
        ],
        "Deque stores indices of elements in decreasing order. Top of deque is always maximum of current window.",
        "q = deque(). For i in range(n): remove elements from back of q while nums[q[-1]] <= nums[i]. Push i. Remove front if q[0] <= i - k. If i >= k - 1: res.append(nums[q[0]]).",
        "O(N)",
        "O(K)",
        "Storing values in deque instead of indices prevents checking if element has left the window."
      ],
      [
        "Minimum Size Subarray Sum",
        209,
        "minimum-size-subarray-sum",
        "Medium",
        "Expanding/Shrinking Window",
        [
          "Google",
          "Amazon",
          "Microsoft"
        ],
        "All numbers positive. Expand right until sum >= target, then shrink left to minimize window.",
        "l = 0, cur_sum = 0, min_len = inf. For r in 0..n-1: cur_sum += nums[r]; while cur_sum >= target: min_len = min(min_len, r - l + 1); cur_sum -= nums[l]; l += 1.",
        "O(N)",
        "O(1)",
        "If no such subarray exists, return 0 (check min_len == inf)."
      ],
      [
        "Fruit Into Baskets",
        904,
        "fruit-into-baskets",
        "Medium",
        "Longest Subarray with at most 2 Distinct",
        [
          "Google",
          "Amazon"
        ],
        "Equivalent to finding longest contiguous subarray with at most 2 distinct elements.",
        "counts = defaultdict(int); l = 0, max_fruits = 0. Expand r: counts[tree[r]] += 1. While len(counts) > 2: counts[tree[l]] -= 1; if counts[tree[l]] == 0: del counts[tree[l]]; l += 1. max_fruits = max(max_fruits, r - l + 1).",
        "O(N)",
        "O(1)",
        "Must delete key from dict when count hits 0 to maintain len(counts) <= 2."
      ],
      [
        "Max Consecutive Ones III",
        1004,
        "max-consecutive-ones-iii",
        "Medium",
        "Window with at most K Zeros",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Equivalent to finding longest subarray with at most k zeros.",
        "l = 0, zeros = 0, res = 0. For r in range(n): if nums[r] == 0: zeros += 1; while zeros > k: if nums[l] == 0: zeros -= 1; l += 1; res = max(res, r - l + 1).",
        "O(N)",
        "O(1)",
        "Negative or 0 k values."
      ],
      [
        "Find All Anagrams in a String",
        438,
        "find-all-anagrams-in-a-string",
        "Medium",
        "Fixed Window Anagram Search",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Slide window of size len(p) over s, tracking count of matching characters.",
        "Initialize counts for p and s[:len(p)]. Slide window: increment s[r], decrement s[l], check if counts match.",
        "O(len(s))",
        "O(1)",
        "len(s) < len(p) returns empty list immediately."
      ]
    ]
  },
  {
    "topic": "Prefix Sum",
    "description": "Cumulative array queries, range sum in O(1), and prefix-modulo techniques.",
    "icon": "plus-circle",
    "problems": [
      [
        "Running Sum of 1D Array",
        1480,
        "running-sum-of-1d-array",
        "Easy",
        "Prefix Accumulator",
        [
          "Google",
          "Amazon"
        ],
        "Each element becomes running sum of all elements up to that index.",
        "For i in 1..n-1: nums[i] += nums[i-1]. Return nums.",
        "O(N)",
        "O(1)",
        "In-place modification vs returning new array."
      ],
      [
        "Range Sum Query - Immutable",
        303,
        "range-sum-query-immutable",
        "Easy",
        "Prefix Sum Precomputation",
        [
          "Amazon",
          "Meta"
        ],
        "Range sum [l, r] = prefix[r + 1] - prefix[l] computed in O(1) time.",
        "Build prefix array of length n + 1 where prefix[i] = prefix[i-1] + nums[i-1]. Query: prefix[r+1] - prefix[l].",
        "O(1) query",
        "O(N)",
        "Off-by-one indexing on prefix array."
      ],
      [
        "Subarray Sum Equals K",
        560,
        "subarray-sum-equals-k",
        "Medium",
        "Prefix Sum + Hash Map",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "prefix[j] - prefix[i] = k -> count previous prefixes equal to current_prefix - k.",
        "counts = {0: 1}, cur = 0, res = 0. For x in nums: cur += x; res += counts.get(cur - k, 0); counts[cur] = counts.get(cur, 0) + 1.",
        "O(N)",
        "O(N)",
        "Missing counts[0] = 1 handles subarrays starting at index 0."
      ],
      [
        "Contiguous Array",
        525,
        "contiguous-array",
        "Medium",
        "Prefix Sum with +1 and -1",
        [
          "Google",
          "Amazon",
          "Meta"
        ],
        "Equal number of 0s and 1s. Treat 0 as -1 and 1 as +1. Problem becomes finding longest subarray with sum 0.",
        "first_seen = {0: -1}. cur = 0, max_len = 0. For i, x in enumerate(nums): cur += (1 if x == 1 else -1); if cur in first_seen: max_len = max(max_len, i - first_seen[cur]); else: first_seen[cur] = i.",
        "O(N)",
        "O(N)",
        "Do not overwrite first_seen[cur] when cur repeats; earliest index maximizes length."
      ],
      [
        "Product of Array Except Self",
        238,
        "product-of-array-except-self",
        "Medium",
        "Prefix & Suffix Products",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Prefix product from left, suffix product from right.",
        "prefix[i] * suffix[i] gives product excluding index i.",
        "O(N)",
        "O(1) aux",
        "Division forbidden by prompt."
      ],
      [
        "Find Pivot Index",
        724,
        "find-pivot-index",
        "Easy",
        "Left Sum vs Right Sum",
        [
          "Amazon",
          "Google"
        ],
        "Pivot index has sum(left) == sum(right). total_sum - left_sum - nums[i] equals right_sum.",
        "total = sum(nums), left = 0. For i, x in enumerate(nums): if left == total - left - x: return i; left += x. Return -1.",
        "O(N)",
        "O(1)",
        "Return leftmost pivot if multiple exist."
      ],
      [
        "Corporate Flight Bookings",
        1109,
        "corporate-flight-bookings",
        "Medium",
        "Difference Array / Sweep Line",
        [
          "Google",
          "Amazon"
        ],
        "Range update [first, last] with seats. Add +seats at first - 1, add -seats at last.",
        "diff = [0] * (n + 1). For first, last, seats in bookings: diff[first-1] += seats; diff[last] -= seats. Prefix sum diff to get final seats.",
        "O(N + B)",
        "O(N)",
        "1-based indexing in input converted to 0-based."
      ],
      [
        "Subarray Sums Divisible by K",
        974,
        "subarray-sums-divisible-by-k",
        "Medium",
        "Prefix Sum Modulo K",
        [
          "Amazon",
          "Microsoft"
        ],
        "If (prefix[j] - prefix[i]) % k == 0, then prefix[j] % k == prefix[i] % k.",
        "counts = {0: 1}. cur = 0, res = 0. For x in nums: cur = (cur + x) % k; res += counts.get(cur, 0); counts[cur] = counts.get(cur, 0) + 1.",
        "O(N)",
        "O(K)",
        "Negative numbers in Python vs other languages (Python % k is always positive; in C++/Java normalize (rem + k) % k)."
      ]
    ]
  },
  {
    "topic": "Binary Search",
    "description": "Logarithmic search on sorted arrays, search spaces, and binary search on the answer.",
    "icon": "search",
    "problems": [
      [
        "Binary Search",
        704,
        "binary-search",
        "Easy",
        "Classic Divide & Conquer",
        [
          "Google",
          "Amazon",
          "Microsoft"
        ],
        "Compare mid with target. Halve search space every iteration.",
        "l = 0, r = n - 1. While l <= r: mid = l + (r - l)//2. If nums[mid] == target return mid; elif nums[mid] < target: l = mid + 1; else: r = mid - 1. Return -1.",
        "O(log N)",
        "O(1)",
        "Integer overflow with (l + r)//2 in C++/Java. Use l + (r - l)//2."
      ],
      [
        "Search Insert Position",
        35,
        "search-insert-position",
        "Easy",
        "Lower Bound Binary Search",
        [
          "Amazon",
          "Google",
          "Apple"
        ],
        "If target found, return index. If not found, left pointer points to insertion position.",
        "l = 0, r = n - 1. While l <= r: mid = (l + r)//2. If nums[mid] < target: l = mid + 1; else: r = mid - 1. Return l.",
        "O(log N)",
        "O(1)",
        "Returning l vs r. When loop terminates, l is insertion point."
      ],
      [
        "First Bad Version",
        278,
        "first-bad-version",
        "Easy",
        "First True Binary Search",
        [
          "Google",
          "Meta"
        ],
        "Versions are [false, false, ..., true, true]. Find boundary where isBadVersion(mid) becomes true.",
        "l = 1, r = n. While l < r: mid = l + (r - l)//2. If isBadVersion(mid): r = mid; else: l = mid + 1. Return l.",
        "O(log N)",
        "O(1)",
        "r = mid vs r = mid - 1. When mid is bad, it could be first bad version."
      ],
      [
        "Search in Rotated Sorted Array",
        33,
        "search-in-rotated-sorted-array",
        "Medium",
        "Rotated Array Binary Search",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Determine which half is sorted, check if target falls in it.",
        "Check nums[l] <= nums[mid]. Search sorted half or opposite.",
        "O(log N)",
        "O(1)",
        "Boundary <= conditions."
      ],
      [
        "Find Minimum in Rotated Sorted Array",
        153,
        "find-minimum-in-rotated-sorted-array",
        "Medium",
        "Inflection Point Search",
        [
          "Meta",
          "Amazon"
        ],
        "Compare mid with right. Inflection point in right half if mid > right.",
        "While l < r: mid = (l + r)//2. If nums[mid] > nums[r]: l = mid + 1; else: r = mid. Return nums[l].",
        "O(log N)",
        "O(1)",
        "Comparing with left can fail on non-rotated array."
      ],
      [
        "Search a 2D Matrix",
        74,
        "search-a-2d-matrix",
        "Medium",
        "Virtual Flattened 1D Array",
        [
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "Matrix of m x n sorted elements is a virtual 1D array of length m*n. mid corresponds to matrix[mid // n][mid % n].",
        "l = 0, r = m * n - 1. While l <= r: mid = (l + r)//2; val = matrix[mid // n][mid % n]. If val == target return True; elif val < target: l = mid + 1; else: r = mid - 1. Return False.",
        "O(log(M * N))",
        "O(1)",
        "Row / col mapping formulas (mid // n, mid % n)."
      ],
      [
        "Koko Eating Bananas",
        875,
        "koko-eating-bananas",
        "Medium",
        "Binary Search on Answer Range",
        [
          "Google",
          "Amazon",
          "Airbnb"
        ],
        "Speed k lies in [1, max(piles)]. Can Koko eat all bananas in h hours at speed k? Monotonic function.",
        "l = 1, r = max(piles). While l < r: mid = (l + r)//2; hours = sum(ceil(p / mid) for p in piles). If hours <= h: r = mid; else: l = mid + 1. Return l.",
        "O(N log(max(piles)))",
        "O(1)",
        "Integer ceiling division: (p + mid - 1) // mid."
      ],
      [
        "Capacity to Ship Packages Within D Days",
        1011,
        "capacity-to-ship-packages-within-d-days",
        "Medium",
        "Binary Search on Capacity Answer",
        [
          "Google",
          "Amazon"
        ],
        "Capacity lies in [max(weights), sum(weights)]. Check if a given capacity can ship within days.",
        "l = max(weights), r = sum(weights). While l < r: mid = (l + r)//2. If can_ship(mid, days): r = mid; else: l = mid + 1. Return l.",
        "O(N log(sum - max))",
        "O(1)",
        "Lower bound must be max(weights) because a ship must carry the heaviest single package."
      ],
      [
        "Find Peak Element",
        162,
        "find-peak-element",
        "Medium",
        "Binary Search on Gradient",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "If nums[mid] < nums[mid + 1], you are on an uphill slope. A peak is guaranteed to exist on the right.",
        "l = 0, r = n - 1. While l < r: mid = (l + r)//2. If nums[mid] < nums[mid + 1]: l = mid + 1; else: r = mid. Return l.",
        "O(log N)",
        "O(1)",
        "Array elements are strictly different adjacent nums[i] != nums[i+1]."
      ],
      [
        "Time Based Key-Value Store",
        981,
        "time-based-key-value-store",
        "Medium",
        "Hash Map + Binary Search Timestamp",
        [
          "Google",
          "Netflix",
          "Amazon"
        ],
        "Store list of (timestamp, value) pairs for each key. Timestamps are strictly increasing; use binary search.",
        "get(key, timestamp): binary search on key's list for largest timestamp <= query_timestamp.",
        "O(log N) get, O(1) set",
        "O(N)",
        "Query timestamp smaller than any stored timestamp returns empty string."
      ],
      [
        "Median of Two Sorted Arrays",
        4,
        "median-of-two-sorted-arrays",
        "Hard",
        "Binary Search on Partition Cut",
        [
          "Google",
          "Amazon",
          "Microsoft",
          "Meta",
          "Apple"
        ],
        "Partition both arrays such that left halves have same total elements as right halves, and max(left) <= min(right).",
        "Binary search cut on shorter array A. cutB = (m + n + 1)//2 - cutA. Check if maxLeftA <= minRightB and maxLeftB <= minRightA. If so, compute median from border elements.",
        "O(log(min(M, N)))",
        "O(1)",
        "Always binary search on the shorter array to ensure O(log(min(M, N))) and valid index bounds."
      ],
      [
        "Split Array Largest Sum",
        410,
        "split-array-largest-sum",
        "Hard",
        "Binary Search on Max Subarray Sum",
        [
          "Google",
          "Amazon"
        ],
        "Binary search on the largest subarray sum value in range [max(nums), sum(nums)].",
        "Check if array can be split into <= k subarrays with sum <= mid. Adjust bounds.",
        "O(N log(sum))",
        "O(1)",
        "Similar to Ship Packages problem."
      ],
      [
        "Find First and Last Position of Element in Sorted Array",
        34,
        "find-first-and-last-position-of-element-in-sorted-array",
        "Medium",
        "Double Binary Search Boundaries",
        [
          "Meta",
          "Amazon",
          "LinkedIn"
        ],
        "Two binary searches: one searches for leftmost index (r = mid - 1 on match), one searches for rightmost (l = mid + 1 on match).",
        "find_bound(is_first): if nums[mid] == target: save res; if is_first: r = mid - 1; else: l = mid + 1.",
        "O(log N)",
        "O(1)",
        "Linear scan after finding match takes O(N) when all elements are duplicates. Must use binary search for both."
      ],
      [
        "Minimum Number of Days to Make m Bouquets",
        1482,
        "minimum-number-of-days-to-make-m-bouquets",
        "Medium",
        "Binary Search on Bloom Days",
        [
          "Google",
          "Amazon"
        ],
        "Search space of days [1, max(bloomDay)]. Check if m contiguous bouquets of k flowers can be picked.",
        "l = 1, r = max(bloomDay). While l < r: mid = (l + r)//2. If count_bouquets(mid) >= m: r = mid; else: l = mid + 1. Return l.",
        "O(N log(max_day))",
        "O(1)",
        "If m * k > len(bloomDay), return -1 immediately."
      ],
      [
        "Magnetic Force Between Two Balls",
        1552,
        "magnetic-force-between-two-balls",
        "Medium",
        "Aggressive Cows / Binary Search Distance",
        [
          "Amazon",
          "Google"
        ],
        "Search space is minimum distance between balls [1, position[-1] - position[0]]. Check if m balls can be placed with >= mid distance.",
        "Sort position. l = 1, r = position[-1] - position[0]. While l <= r: mid = (l + r)//2. If can_place(mid, m): ans = mid; l = mid + 1; else: r = mid - 1. Return ans.",
        "O(N log(range))",
        "O(1)",
        "Greedy placement: always place first ball at position[0]."
      ]
    ]
  },
  {
    "topic": "Linked List",
    "description": "Pointer manipulation, cycle detection, reversal, and multi-list merging.",
    "icon": "link",
    "problems": [
      [
        "Reverse Linked List",
        206,
        "reverse-linked-list",
        "Easy",
        "Three Pointer Reversal",
        [
          "Amazon",
          "Google",
          "Microsoft",
          "Meta",
          "Apple"
        ],
        "For each node, point its next pointer to the previous node. Track prev, curr, next.",
        "prev = None, curr = head. While curr: nxt = curr.next; curr.next = prev; prev = curr; curr = nxt. Return prev.",
        "O(N)",
        "O(1)",
        "Losing reference to curr.next before rewiring pointer."
      ],
      [
        "Merge Two Sorted Lists",
        21,
        "merge-two-sorted-lists",
        "Easy",
        "Dummy Head Two Pointers",
        [
          "Amazon",
          "Microsoft",
          "Apple",
          "Google"
        ],
        "Create dummy head. Attach smaller node of l1 and l2, then advance that list pointer.",
        "dummy = ListNode(0); tail = dummy. While l1 and l2: if l1.val < l2.val: tail.next = l1; l1 = l1.next; else: tail.next = l2; l2 = l2.next; tail = tail.next. tail.next = l1 or l2. Return dummy.next.",
        "O(N + M)",
        "O(1)",
        "Remember to attach remaining non-empty list tail at end."
      ],
      [
        "Linked List Cycle",
        141,
        "linked-list-cycle",
        "Easy",
        "Floyd's Fast & Slow Pointers",
        [
          "Amazon",
          "Microsoft",
          "Meta"
        ],
        "Fast moves 2 steps, slow moves 1 step. If a cycle exists, fast will inevitably catch slow.",
        "slow = fast = head. While fast and fast.next: slow = slow.next; fast = fast.next.next; if slow == fast: return True. Return False.",
        "O(N)",
        "O(1)",
        "Checking fast.next is null before fast.next.next."
      ],
      [
        "Linked List Cycle II",
        142,
        "linked-list-cycle-ii",
        "Medium",
        "Floyd's Cycle Entry Detection",
        [
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "When slow and fast meet, reset slow to head. Advance both 1 step at a time; they will meet at the cycle entry node.",
        "Find intersection. slow = head. While slow != fast: slow = slow.next; fast = fast.next. Return slow.",
        "O(N)",
        "O(1)",
        "Mathematical proof: distance from head to entry equals distance from meeting point to entry."
      ],
      [
        "Remove Nth Node From End of List",
        19,
        "remove-nth-node-from-end-of-list",
        "Medium",
        "Two Pointers N Steps Ahead",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Advance fast pointer n steps ahead. Then advance slow and fast together until fast reaches end.",
        "dummy = ListNode(0, head); fast = slow = dummy. Advance fast n+1 times. While fast: fast = fast.next; slow = slow.next. slow.next = slow.next.next. Return dummy.next.",
        "O(N)",
        "O(1)",
        "Removing head node edge case cleanly handled by dummy node."
      ],
      [
        "Reorder List",
        143,
        "reorder-list",
        "Medium",
        "Find Mid + Reverse + Interleave",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "L0 -> Ln -> L1 -> Ln-1... Find middle, reverse second half, interleave two halves node by node.",
        "1. Fast/slow to find mid. 2. Reverse second half. 3. Merge alternating nodes.",
        "O(N)",
        "O(1)",
        "Severing first half's tail (mid.next = None) to avoid cycle."
      ],
      [
        "Add Two Numbers",
        2,
        "add-two-numbers",
        "Medium",
        "Elementary Addition with Carry",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft"
        ],
        "Simulate schoolbook addition column by column, maintaining carry.",
        "dummy = ListNode(0); curr = dummy; carry = 0. While l1 or l2 or carry: val = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry; carry = val // 10; curr.next = ListNode(val % 10); curr = curr.next; advance l1, l2.",
        "O(max(N, M))",
        "O(max(N, M))",
        "Forgetting remaining carry after both lists are exhausted (e.g. 5 + 5 = 10)."
      ],
      [
        "Copy List with Random Pointer",
        138,
        "copy-list-with-random-pointer",
        "Medium",
        "Interleaved Nodes / Hash Map",
        [
          "Amazon",
          "Meta",
          "Microsoft"
        ],
        "Clone nodes and interleave them directly behind originals: A -> A' -> B -> B'. Assign randoms: curr.next.random = curr.random.next. Then unweave.",
        "1. Insert clone after each node. 2. Copy random pointers. 3. Separate cloned list from original.",
        "O(N)",
        "O(1) aux",
        "Handling null random pointers without throwing null pointer exceptions."
      ],
      [
        "Merge k Sorted Lists",
        23,
        "merge-k-sorted-lists",
        "Hard",
        "Min-Heap / Divide & Conquer",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft",
          "Apple"
        ],
        "Push first node of all k lists into min-heap. Pop smallest, attach to result, push popped node's next.",
        "heap = [(node.val, i, node) for i, node in enumerate(lists) if node]. heapify(heap). While heap: val, i, node = heappop(heap); tail.next = node; if node.next: heappush(heap, (node.next.val, i, node.next)).",
        "O(N log K)",
        "O(K)",
        "Python heap comparison requires index i as tiebreaker to avoid comparing ListNode instances directly."
      ],
      [
        "Reverse Nodes in k-Group",
        25,
        "reverse-nodes-in-k-group",
        "Hard",
        "Iterative Segment Reversal",
        [
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "Count k nodes ahead. If >= k nodes remain, reverse those k nodes and stitch to previous and next segments.",
        "Check if k nodes exist. Reverse segment of k nodes. Recursively or iteratively connect to next reversed group.",
        "O(N)",
        "O(1)",
        "Incomplete final group (< k nodes) must be left as-is."
      ],
      [
        "Palindrome Linked List",
        234,
        "palindrome-linked-list",
        "Easy",
        "Midpoint + Reverse Second Half",
        [
          "Amazon",
          "Microsoft"
        ],
        "Find midpoint with fast/slow. Reverse second half. Compare values of first and second half.",
        "slow, fast = head, head. While fast and fast.next: slow = slow.next; fast = fast.next.next. Reverse from slow. Compare with head.",
        "O(N)",
        "O(1)",
        "Restoring original list structure before returning (good engineering practice)."
      ],
      [
        "Intersection of Two Linked Lists",
        160,
        "intersection-of-two-linked-lists",
        "Easy",
        "Two Pointer Loop Alignment",
        [
          "Amazon",
          "Microsoft",
          "Apple"
        ],
        "Pointer A walks list A then list B. Pointer B walks list B then list A. Both travel equal total distance (a + b) and meet at intersection or null.",
        "pA, pB = headA, headB. While pA != pB: pA = pA.next if pA else headB; pB = pB.next if pB else headA. Return pA.",
        "O(N + M)",
        "O(1)",
        "If no intersection, both reach None at end of second traversal simultaneously."
      ]
    ]
  },
  {
    "topic": "Stack & Monotonic Stack",
    "description": "LIFO operations, monotonic stack for next greater/smaller elements, and histogram areas.",
    "icon": "layers",
    "problems": [
      [
        "Valid Parentheses",
        20,
        "valid-parentheses",
        "Easy",
        "LIFO Matching",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Push open brackets, pop and verify closures match.",
        "Match top of stack with incoming closing bracket.",
        "O(N)",
        "O(N)",
        "Popping empty stack."
      ],
      [
        "Min Stack",
        155,
        "min-stack",
        "Medium",
        "Two Stacks / Value-Min Pairs",
        [
          "Amazon",
          "Bloomberg",
          "Google"
        ],
        "Stack elements store (value, current_min) pair so getMin() is instant O(1).",
        "push(val): new_min = min(val, min_stack[-1] if min_stack else val). Append (val, new_min). pop(): pop from stack. getMin(): return stack[-1][1].",
        "O(1) all ops",
        "O(N)",
        "Popping empty stack edge case."
      ],
      [
        "Evaluate Reverse Polish Notation",
        150,
        "evaluate-reverse-polish-notation",
        "Medium",
        "Operand Stack",
        [
          "Amazon",
          "Google",
          "LinkedIn"
        ],
        "Push numbers to stack. When operator encountered, pop top two operands, evaluate, push result.",
        "For token in tokens: if token in '+-*/': b = stack.pop(); a = stack.pop(); apply operator; stack.append(res); else: stack.append(int(token)).",
        "O(N)",
        "O(N)",
        "Truncation toward zero for division: in Python int(a / b), not a // b which truncates toward -inf."
      ],
      [
        "Daily Temperatures",
        739,
        "daily-temperatures",
        "Medium",
        "Monotonic Decreasing Stack",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Maintain stack of indices with decreasing temperatures. When warmer day arrives, pop and calculate distance.",
        "res = [0] * n, stack = []. For i, t in enumerate(temperatures): while stack and t > temperatures[stack[-1]]: prev_i = stack.pop(); res[prev_i] = i - prev_i. stack.append(i).",
        "O(N)",
        "O(N)",
        "Storing temperatures instead of indices in stack prevents computing distance."
      ],
      [
        "Next Greater Element I",
        496,
        "next-greater-element-i",
        "Easy",
        "Monotonic Stack + Hash Map",
        [
          "Amazon",
          "Google"
        ],
        "Find next greater element for all elements in nums2 using monotonic stack, cache in map, then query for nums1.",
        "stack = [], next_greater = {}. For x in nums2: while stack and x > stack[-1]: next_greater[stack.pop()] = x; stack.append(x). Return [next_greater.get(x, -1) for x in nums1].",
        "O(N + M)",
        "O(M)",
        "Elements with no greater element default to -1."
      ],
      [
        "Largest Rectangle in Histogram",
        84,
        "largest-rectangle-in-histogram",
        "Hard",
        "Monotonic Increasing Stack",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft"
        ],
        "For each bar, rectangle height is limited by this bar. Extend left and right until shorter bar encountered.",
        "stack = [-1]. max_area = 0. Append 0 to heights as sentinel. For i, h in enumerate(heights): while stack[-1] != -1 and heights[stack[-1]] >= h: height = heights[stack.pop()]; width = i - stack[-1] - 1; max_area = max(max_area, height * width); stack.append(i).",
        "O(N)",
        "O(N)",
        "Sentinel 0 at end forces stack to flush completely without extra post-loop code."
      ],
      [
        "Car Fleet",
        853,
        "car-fleet",
        "Medium",
        "Monotonic Stack by Position",
        [
          "Google",
          "Amazon"
        ],
        "Sort cars by starting position descending. Calculate time to finish. A car catches up if time <= fleet ahead.",
        "cars = sorted(zip(position, speed), reverse=True). times = [(target - p)/s for p, s in cars]. stack = []. For t in times: if not stack or t > stack[-1]: stack.append(t). Return len(stack).",
        "O(N log N)",
        "O(N)",
        "Cars can never pass each other; they join the fleet of the slower car ahead."
      ],
      [
        "Asteroid Collision",
        735,
        "asteroid-collision",
        "Medium",
        "Simulation Stack",
        [
          "Google",
          "Amazon",
          "Meta"
        ],
        "Positive asteroids move right, negative asteroids move left. Collision only occurs if top of stack > 0 and incoming < 0.",
        "stack = []. For a in asteroids: while stack and a < 0 < stack[-1]: if stack[-1] < -a: stack.pop(); continue; elif stack[-1] == -a: stack.pop(); break; else: stack.append(a).",
        "O(N)",
        "O(N)",
        "Two negative asteroids moving left never collide; two positive moving right never collide."
      ],
      [
        "Simplify Path",
        71,
        "simplify-path",
        "Medium",
        "Directory Stack",
        [
          "Meta",
          "Amazon",
          "Microsoft"
        ],
        "Split by '/'. '.' does nothing. '..' pops directory from stack. Named segments push to stack.",
        "stack = []. For part in path.split('/'): if part == '..': if stack: stack.pop(); elif part and part != '.': stack.append(part). Return '/' + '/'.join(stack).",
        "O(N)",
        "O(N)",
        "Root directory cannot be popped by '..'. Handle multiple consecutive slashes gracefully."
      ],
      [
        "Decode String",
        394,
        "decode-string",
        "Medium",
        "Nested Parentheses Stack",
        [
          "Google",
          "Amazon",
          "Bloomberg"
        ],
        "When encountering '[', push current string and current repeat number to stack. When ']', pop and repeat.",
        "stack = []; cur_num = 0; cur_str = ''. For c in s: if c.isdigit(): cur_num = cur_num * 10 + int(c); elif c == '[': stack.append((cur_str, cur_num)); cur_str = ''; cur_num = 0; elif c == ']': prev_str, num = stack.pop(); cur_str = prev_str + cur_str * num; else: cur_str += c. Return cur_str.",
        "O(Output Length)",
        "O(Output Length)",
        "Multi-digit numbers (e.g. '100[a]'). Parse properly."
      ]
    ]
  },
  {
    "topic": "Queue & Deque",
    "description": "FIFO queues, double-ended deques, sliding window maximum, and BFS buffers.",
    "icon": "inbox",
    "problems": [
      [
        "Implement Queue using Stacks",
        232,
        "implement-queue-using-stacks",
        "Easy",
        "Two Stacks Amortized O(1)",
        [
          "Amazon",
          "Microsoft"
        ],
        "In-stack for pushing. Out-stack for popping. Transfer from in to out only when out is empty.",
        "push(x): in_stack.append(x). pop(): if not out_stack: while in_stack: out_stack.append(in_stack.pop()). Return out_stack.pop().",
        "Amortized O(1)",
        "O(N)",
        "Do not transfer on every push; only transfer when popping and out_stack is empty."
      ],
      [
        "Implement Stack using Queues",
        225,
        "implement-stack-using-queues",
        "Easy",
        "Single Queue Rotation",
        [
          "Amazon",
          "Microsoft"
        ],
        "Push x to queue, then rotate preceding n-1 elements to the back of the queue.",
        "push(x): q.append(x); for _ in range(len(q) - 1): q.append(q.popleft()). pop(): return q.popleft().",
        "O(N) push, O(1) pop",
        "O(N)",
        "Queue only supports FIFO operations: append and popleft."
      ],
      [
        "Number of Recent Calls",
        933,
        "number-of-recent-calls",
        "Easy",
        "Sliding Time Window Queue",
        [
          "Google",
          "Amazon"
        ],
        "Store ping timestamps in queue. Discard timestamps older than t - 3000.",
        "q.append(t); while q[0] < t - 3000: q.popleft(); return len(q).",
        "Amortized O(1)",
        "O(W)",
        "Timestamps are strictly increasing."
      ],
      [
        "Sliding Window Maximum",
        239,
        "sliding-window-maximum",
        "Hard",
        "Monotonic Deque Indices",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Maintain monotonic decreasing deque of indices. Front of deque is maximum.",
        "Pop smaller elements from back; evict expired indices from front.",
        "O(N)",
        "O(K)",
        "Storing indices instead of raw values."
      ],
      [
        "Design Circular Queue",
        622,
        "design-circular-queue",
        "Medium",
        "Array with Head & Tail Modulo",
        [
          "Amazon",
          "Microsoft"
        ],
        "Fixed-size array with head and count pointers. Index modulo capacity prevents shifting.",
        "enQueue(val): if isFull() return False; q[(head + count) % k] = val; count += 1. deQueue(): if isEmpty() return False; head = (head + 1) % k; count -= 1.",
        "O(1) all ops",
        "O(K)",
        "Distinguishing between full and empty queue without wasting one slot by using count variable."
      ],
      [
        "Rotting Oranges",
        994,
        "rotting-oranges",
        "Medium",
        "Multi-Source BFS Queue",
        [
          "Amazon",
          "Microsoft",
          "Meta",
          "Google"
        ],
        "Add all initially rotten oranges to queue. Each minute, rot adjacent fresh oranges layer-by-layer.",
        "q = deque(all rotten coords); fresh = count fresh. minutes = 0. While q and fresh > 0: for _ in range(len(q)): r, c = q.popleft(); for dr, dc in directions: if fresh: mark rotten, fresh -= 1, q.append((nr, nc)). minutes += 1. Return minutes if fresh == 0 else -1.",
        "O(R * C)",
        "O(R * C)",
        "Isolated fresh orange that cannot be reached: return -1."
      ],
      [
        "Shortest Path in Binary Matrix",
        1091,
        "shortest-path-in-binary-matrix",
        "Medium",
        "8-Directional BFS Queue",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "BFS explores shortest path layer-by-layer in unweighted 8-directional grid.",
        "If grid[0][0] != 0 or grid[n-1][n-1] != 0: return -1. q = deque([(0, 0, 1)]). Mark visited in-place. Pop, explore 8 neighbors.",
        "O(N^2)",
        "O(N^2)",
        "Marking visited at queue insertion time prevents pushing the same node multiple times."
      ]
    ]
  },
  {
    "topic": "Trees",
    "description": "Binary tree traversals (pre/in/post/level), recursive depth, views, and LCA.",
    "icon": "git-branch",
    "problems": [
      [
        "Maximum Depth of Binary Tree",
        104,
        "maximum-depth-of-binary-tree",
        "Easy",
        "DFS Depth Recursion",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Depth of tree is 1 + max(depth(left), depth(right)). Base case null node is depth 0.",
        "if not root: return 0; return 1 + max(maxDepth(root.left), maxDepth(root.right)).",
        "O(N)",
        "O(H)",
        "Stack overflow on skewed tree; iterative BFS can be used if call stack depth is a concern."
      ],
      [
        "Invert Binary Tree",
        226,
        "invert-binary-tree",
        "Easy",
        "Recursive Node Swap",
        [
          "Google",
          "Amazon",
          "Microsoft"
        ],
        "Swap left and right children recursively for every node.",
        "if not root: return None; root.left, root.right = invertTree(root.right), invertTree(root.left); return root.",
        "O(N)",
        "O(H)",
        "Swapping before or after recursive calls works as long as temporary assignment preserves references."
      ],
      [
        "Same Tree",
        100,
        "same-tree",
        "Easy",
        "Simultaneous DFS Traversal",
        [
          "Amazon",
          "Google"
        ],
        "Two trees are same if current values match and both left and right subtrees match.",
        "if not p and not q: return True; if not p or not q or p.val != q.val: return False; return isSameTree(p.left, q.left) and isSameTree(p.right, q.right).",
        "O(N)",
        "O(H)",
        "One tree null while other non-null."
      ],
      [
        "Subtree of Another Tree",
        572,
        "subtree-of-another-tree",
        "Easy",
        "DFS Search + isSameTree",
        [
          "Amazon",
          "Microsoft"
        ],
        "Check if isSameTree(root, subRoot). If not, recursively check root.left or root.right.",
        "if not root: return False; if isSameTree(root, subRoot): return True; return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot).",
        "O(N * M)",
        "O(H)",
        "Tree serialization with sentinels achieves linear O(N + M) using KMP."
      ],
      [
        "Diameter of Binary Tree",
        543,
        "diameter-of-binary-tree",
        "Easy",
        "Post-order Depth Accumulator",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Longest path through node = depth(left) + depth(right). Max diameter across all nodes.",
        "max_d = 0. def depth(node): nonlocal max_d; if not node: return 0; l, r = depth(node.left), depth(node.right); max_d = max(max_d, l + r); return 1 + max(l, r). depth(root); return max_d.",
        "O(N)",
        "O(H)",
        "Path doesn't necessarily pass through the root node."
      ],
      [
        "Balanced Binary Tree",
        110,
        "balanced-binary-tree",
        "Easy",
        "Bottom-Up Height Checking",
        [
          "Amazon",
          "Google"
        ],
        "Return height of subtree if balanced, or -1 if unbalanced. Propagate -1 upward.",
        "def check(node): if not node: return 0; l = check(node.left); if l == -1: return -1; r = check(node.right); if r == -1 or abs(l - r) > 1: return -1; return 1 + max(l, r). Return check(root) != -1.",
        "O(N)",
        "O(H)",
        "Top-down approach recomputes height at every node resulting in O(N^2); bottom-up achieves O(N)."
      ],
      [
        "Binary Tree Level Order Traversal",
        102,
        "binary-tree-level-order-traversal",
        "Medium",
        "Queue BFS Level-by-Level",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft"
        ],
        "Process queue in batches matching current queue size to group by level.",
        "q = deque([root] if root else []); res = []. While q: level = []; for _ in range(len(q)): node = q.popleft(); level.append(node.val); if node.left: q.append(node.left); if node.right: q.append(node.right); res.append(level). Return res.",
        "O(N)",
        "O(N)",
        "Empty root returns empty list []."
      ],
      [
        "Binary Tree Right Side View",
        199,
        "binary-tree-right-side-view",
        "Medium",
        "BFS / Preorder Modified DFS",
        [
          "Meta",
          "Amazon"
        ],
        "Last node in each level order traversal, or DFS visiting (root -> right -> left) picking first node at each depth.",
        "res = []. def dfs(node, depth): if not node: return; if depth == len(res): res.append(node.val); dfs(node.right, depth + 1); dfs(node.left, depth + 1). dfs(root, 0); return res.",
        "O(N)",
        "O(H)",
        "Only visiting right child fails if left subtree extends deeper than right subtree."
      ],
      [
        "Lowest Common Ancestor of a Binary Tree",
        236,
        "lowest-common-ancestor-of-a-binary-tree",
        "Medium",
        "Post-order Branch Traversal",
        [
          "Meta",
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "If current node is p or q, return current node. Search left and right. If both return non-null, current node is LCA.",
        "if not root or root == p or root == q: return root. l = lowestCommonAncestor(root.left, p, q); r = lowestCommonAncestor(root.right, p, q); if l and r: return root; return l or r.",
        "O(N)",
        "O(H)",
        "Assuming nodes always exist in tree. (Guaranteed by problem statement)."
      ],
      [
        "Binary Tree Maximum Path Sum",
        124,
        "binary-tree-maximum-path-sum",
        "Hard",
        "Post-order Subtree Contribution",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Path can branch at any node: root.val + max(0, left_gain) + max(0, right_gain). Function returns single-branch gain.",
        "max_sum = -inf. def gain(node): nonlocal max_sum; if not node: return 0; l = max(0, gain(node.left)); r = max(0, gain(node.right)); max_sum = max(max_sum, node.val + l + r); return node.val + max(l, r). gain(root); return max_sum.",
        "O(N)",
        "O(H)",
        "Negative subtree gains must be clamped to 0 with max(0, gain)."
      ],
      [
        "Serialize and Deserialize Binary Tree",
        297,
        "serialize-and-deserialize-binary-tree",
        "Hard",
        "Preorder Traversal with Null Markers",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft"
        ],
        "Preorder traversal with sentinel '#' for null nodes preserves complete tree structure uniquely.",
        "Serialize: root -> 'val,' + serialize(left) + serialize(right), '#' for null. Deserialize: iterator over split tokens, build node, recurse left, recurse right.",
        "O(N)",
        "O(N)",
        "Multiple digit values or negative numbers; use delimiter like ','."
      ],
      [
        "Construct Binary Tree from Preorder and Inorder Traversal",
        105,
        "construct-binary-tree-from-preorder-and-inorder-traversal",
        "Medium",
        "Divide & Conquer Index Map",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Preorder first element is root. Find root in Inorder: elements to left belong to left subtree, right belong to right.",
        "in_map = {val: i for i, val in enumerate(inorder)}. def build(pre_l, pre_r, in_l, in_r): if pre_l > pre_r: return None; root_val = preorder[pre_l]; idx = in_map[root_val]; left_size = idx - in_l; root = TreeNode(root_val); root.left = build(pre_l + 1, pre_l + left_size, in_l, idx - 1); root.right = build(pre_l + left_size + 1, pre_r, idx + 1, in_r); return root.",
        "O(N)",
        "O(N)",
        "Using in_map gives O(N); using inorder.index(val) repeatedly causes O(N^2)."
      ],
      [
        "Path Sum",
        112,
        "path-sum",
        "Easy",
        "Root-to-Leaf DFS Recursion",
        [
          "Amazon",
          "Microsoft"
        ],
        "Subtract node.val from target. If leaf node reached and remaining target == 0, path found.",
        "if not root: return False; if not root.left and not root.right: return root.val == targetSum; return hasPathSum(root.left, targetSum - root.val) or hasPathSum(root.right, targetSum - root.val).",
        "O(N)",
        "O(H)",
        "Path must end at a leaf node (both left and right null). A non-leaf node with target 0 is not a valid path."
      ],
      [
        "Binary Tree Zigzag Level Order Traversal",
        103,
        "binary-tree-zigzag-level-order-traversal",
        "Medium",
        "BFS Level Order with Direction Flag",
        [
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "Level order BFS. Reverse alternating levels, or use a deque to append/prepend based on direction flag.",
        "q = deque([root] if root else []); res = []; left_to_right = True. While q: level = deque(); for _ in range(len(q)): node = q.popleft(); if left_to_right: level.append(node.val); else: level.appendleft(node.val); push children to q. res.append(list(level)); left_to_right = not left_to_right.",
        "O(N)",
        "O(N)",
        "Direction toggles on every level."
      ],
      [
        "Vertical Order Traversal of a Binary Tree",
        987,
        "vertical-order-traversal-of-a-binary-tree",
        "Hard",
        "Coordinate BFS/DFS + Multi-Key Sort",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Assign coordinates (row, col) with root at (0, 0). Left is (row+1, col-1), right is (row+1, col+1). Sort by col, then row, then value.",
        "Collect (col, row, val) for all nodes. Group by col, sort each column by (row, val).",
        "O(N log N)",
        "O(N)",
        "Tiebreaker rule: nodes at same (row, col) must be sorted in ascending order of their values."
      ]
    ]
  },
  {
    "topic": "Binary Search Tree (BST)",
    "description": "BST invariant (left < root < right), in-order sorted property, deletion, and validation.",
    "icon": "git-pull-request",
    "problems": [
      [
        "Validate Binary Search Tree",
        98,
        "validate-binary-search-tree",
        "Medium",
        "Min/Max Bounding Range DFS",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft"
        ],
        "Every node must satisfy min_val < node.val < max_val. Propagate bounds downward.",
        "def validate(node, low=-inf, high=inf): if not node: return True; if not (low < node.val < high): return False; return validate(node.left, low, node.val) and validate(node.right, node.val, high).",
        "O(N)",
        "O(H)",
        "Checking only node.left.val < node.val is insufficient; all nodes in left subtree must be < root.val."
      ],
      [
        "Search in a Binary Search Tree",
        700,
        "search-in-a-binary-search-tree",
        "Easy",
        "BST Property Branching",
        [
          "Amazon",
          "Microsoft"
        ],
        "If val < root.val search left; if val > root.val search right.",
        "curr = root; while curr: if val == curr.val: return curr; curr = curr.left if val < curr.val else curr.right. Return None.",
        "O(H)",
        "O(1)",
        "Iterative BST search uses O(1) space."
      ],
      [
        "Insert into a Binary Search Tree",
        701,
        "insert-into-a-binary-search-tree",
        "Medium",
        "BST Leaf Insertion",
        [
          "Amazon",
          "Google"
        ],
        "Navigate BST until null pointer found, attach new TreeNode.",
        "curr = root; while curr: if val < curr.val: if not curr.left: curr.left = TreeNode(val); break; else: curr = curr.left; else: if not curr.right: curr.right = TreeNode(val); break; else: curr = curr.right. Return root or TreeNode(val).",
        "O(H)",
        "O(1)",
        "Inserting into empty tree root == None."
      ],
      [
        "Delete Node in a BST",
        450,
        "delete-node-in-a-bst",
        "Medium",
        "Inorder Successor Replacement",
        [
          "Amazon",
          "Microsoft"
        ],
        "If node has 2 children, replace its value with inorder successor (min node in right subtree), then delete successor.",
        "If val < root.val: root.left = delete(root.left, val); elif val > root.val: root.right = delete(root.right, val); else: if not root.left: return root.right; if not root.right: return root.left; succ = min_node(root.right); root.val = succ.val; root.right = delete(root.right, succ.val). Return root.",
        "O(H)",
        "O(H)",
        "Handling node with 0, 1, or 2 children correctly."
      ],
      [
        "Lowest Common Ancestor of a BST",
        235,
        "lowest-common-ancestor-of-a-bst",
        "Medium",
        "BST Range Splitting",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "If both p and q are < curr.val, LCA is in left subtree. If both >, right subtree. If they diverge, curr is LCA.",
        "curr = root; while curr: if p.val < curr.val and q.val < curr.val: curr = curr.left; elif p.val > curr.val and q.val > curr.val: curr = curr.right; else: return curr.",
        "O(H)",
        "O(1)",
        "Iterative takes O(1) space; no backtracking or recursion required."
      ],
      [
        "Kth Smallest Element in a BST",
        230,
        "kth-smallest-element-in-a-bst",
        "Medium",
        "In-order Traversal Early Stop",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "In-order traversal of a BST visits nodes in strictly sorted ascending order. Return the kth visited node.",
        "stack = []; curr = root; while curr or stack: while curr: stack.append(curr); curr = curr.left; curr = stack.pop(); k -= 1; if k == 0: return curr.val; curr = curr.right.",
        "O(H + K)",
        "O(H)",
        "Iterative in-order terminates immediately at k without traversing remaining tree."
      ],
      [
        "Convert Sorted Array to Binary Search Tree",
        108,
        "convert-sorted-array-to-binary-search-tree",
        "Easy",
        "Middle Element Root Recursion",
        [
          "Amazon",
          "Google"
        ],
        "Mid element becomes root to guarantee height balance. Recursively build left and right subtrees.",
        "def build(l, r): if l > r: return None; mid = (l + r)//2; node = TreeNode(nums[mid]); node.left = build(l, mid - 1); node.right = build(mid + 1, r); return node. Return build(0, len(nums) - 1).",
        "O(N)",
        "O(log N)",
        "Mid calculation (l + r)//2."
      ],
      [
        "Recover Binary Search Tree",
        99,
        "recover-binary-search-tree",
        "Medium",
        "In-order Inversion Detection",
        [
          "Google",
          "Amazon"
        ],
        "Two nodes swapped in BST cause 1 or 2 inversions in in-order sequence. Find the swapped pair and swap values.",
        "Track prev, first, second. In in-order traversal: if prev and prev.val > curr.val: if not first: first = prev; second = curr. Swap first.val and second.val.",
        "O(N)",
        "O(H)",
        "Morris traversal can achieve O(1) space by modifying tree pointers temporarily."
      ]
    ]
  },
  {
    "topic": "Heap & Priority Queue",
    "description": "Top-K elements, median maintenance, task scheduling, and K-way merging.",
    "icon": "database",
    "problems": [
      [
        "Kth Largest Element in an Array",
        215,
        "kth-largest-element-in-an-array",
        "Medium",
        "Min-Heap of Size K / Quickselect",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Maintain a min-heap of size k. At any moment, the root is the kth largest element seen so far.",
        "heap = []; for x in nums: heappush(heap, x); if len(heap) > k: heappop(heap). Return heap[0].",
        "O(N log K)",
        "O(K)",
        "Quickselect has average O(N) time but worst case O(N^2); Min-heap provides guaranteed O(N log K)."
      ],
      [
        "Last Stone Weight",
        1046,
        "last-stone-weight",
        "Easy",
        "Max-Heap Simulation",
        [
          "Amazon"
        ],
        "Simulate smashing two heaviest stones using a max-heap (negated values in Python).",
        "heap = [-x for x in stones]; heapify(heap). While len(heap) > 1: s1 = -heappop(heap); s2 = -heappop(heap); if s1 != s2: heappush(heap, -(s1 - s2)). Return -heap[0] if heap else 0.",
        "O(N log N)",
        "O(N)",
        "Negate numbers when using Python's min-heap as max-heap."
      ],
      [
        "K Closest Points to Origin",
        973,
        "k-closest-points-to-origin",
        "Medium",
        "Max-Heap of Size K",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Keep max-heap of size k storing points sorted by squared distance x^2 + y^2.",
        "heap = []; for x, y in points: dist = -(x*x + y*y); heappush(heap, (dist, x, y)); if len(heap) > k: heappop(heap). Return [[x, y] for _, x, y in heap].",
        "O(N log K)",
        "O(K)",
        "No need to compute sqrt; x^2 + y^2 maintains identical monotonicity."
      ],
      [
        "Top K Frequent Elements",
        347,
        "top-k-frequent-elements",
        "Medium",
        "Min-Heap or Bucket Sort",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Count frequencies, then use min-heap of size k or bucket sort.",
        "counts = Counter(nums). Min-heap on (freq, num) keeping size k.",
        "O(N log K)",
        "O(N)",
        "Bucket sort achieves pure O(N)."
      ],
      [
        "Find Median from Data Stream",
        295,
        "find-median-from-data-stream",
        "Hard",
        "Two Heaps (Max-Heap & Min-Heap)",
        [
          "Google",
          "Amazon",
          "Meta",
          "Microsoft"
        ],
        "Divide numbers into small half (max-heap) and large half (min-heap). Balance sizes so max_heap has at most 1 more element.",
        "small (max_heap), large (min_heap). heappush(small, -num); heappush(large, -heappop(small)). If len(large) > len(small): heappush(small, -heappop(large)). Median: -small[0] if odd else (-small[0] + large[0])/2.",
        "O(log N) add, O(1) find",
        "O(N)",
        "Balancing heaps after every insertion."
      ],
      [
        "Merge k Sorted Lists",
        23,
        "merge-k-sorted-lists",
        "Hard",
        "Min-Heap K Pointers",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Heap stores current head of each of the k lists.",
        "Pop min node, push node.next to heap.",
        "O(N log K)",
        "O(K)",
        "Tuple comparison collision in Python."
      ],
      [
        "Task Scheduler",
        621,
        "task-scheduler",
        "Medium",
        "Max Frequency Math / Max-Heap",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "The task with max frequency creates (max_freq - 1) chunks of size (n + 1). Fill empty slots with other tasks.",
        "counts = Counter(tasks). max_f = max(counts.values()). max_count = sum(1 for c in counts.values() if c == max_f). Return max(len(tasks), (max_f - 1) * (n + 1) + max_count).",
        "O(N)",
        "O(1) (26 letters)",
        "Idle time cannot be negative: max with total task count len(tasks)."
      ],
      [
        "Kth Smallest Element in a Sorted Matrix",
        378,
        "kth-smallest-element-in-a-sorted-matrix",
        "Medium",
        "Min-Heap K Elements / Binary Search",
        [
          "Amazon",
          "Google"
        ],
        "Rows are sorted. Push first element of each row into min-heap. Pop k-1 times, pushing next element in that row.",
        "heap = [(matrix[r][0], r, 0) for r in range(min(n, k))]; heapify(heap). Pop, push (matrix[r][c+1], r, c+1) if c+1 < n.",
        "O(K log N)",
        "O(N)",
        "Binary search on value range [matrix[0][0], matrix[n-1][n-1]] achieves O(N log(max-min)) with O(1) space."
      ],
      [
        "Meeting Rooms II",
        253,
        "meeting-rooms-ii",
        "Medium",
        "Min-Heap of End Times",
        [
          "Amazon",
          "Meta",
          "Google",
          "Bloomberg"
        ],
        "Sort meetings by start time. Min-heap stores end times of active meetings. If start >= earliest end, reuse room.",
        "intervals.sort(key=lambda x: x[0]). heap = [intervals[0][1]]. For start, end in intervals[1:]: if start >= heap[0]: heappop(heap); heappush(heap, end). Return len(heap).",
        "O(N log N)",
        "O(N)",
        "Start time >= end time allows reuse (meetings don't overlap if one ends when other starts)."
      ],
      [
        "Reorganize String",
        767,
        "reorganize-string",
        "Medium",
        "Max-Heap Interleaving",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Greedily place most frequent character. Use max-heap. Pop top, place, hold, pop second, push held back.",
        "counts = Counter(s). If max(counts.values()) > (len(s) + 1)//2: return ''. heap = [(-f, c) for c, f in counts.items()]; heapify(heap). res = []; prev = (0, ''). While heap: f, c = heappop(heap); res.append(c); if prev[0] < 0: heappush(heap, prev); prev = (f + 1, c). Return ''.join(res).",
        "O(N log A)",
        "O(A) (26 letters)",
        "Check if max_freq > (len(s) + 1)//2 upfront; impossible to arrange without adjacent duplicates."
      ]
    ]
  },
  {
    "topic": "Intervals",
    "description": "Sorting by start/end time, interval merging, intersection, and non-overlapping schedules.",
    "icon": "calendar",
    "problems": [
      [
        "Merge Intervals",
        56,
        "merge-intervals",
        "Medium",
        "Sort by Start Time",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft",
          "Apple"
        ],
        "Sort intervals by start time. If current interval overlaps with previous (start <= prev.end), merge them: prev.end = max(prev.end, end).",
        "intervals.sort(key=lambda x: x[0]). merged = [intervals[0]]. For start, end in intervals[1:]: if start <= merged[-1][1]: merged[-1][1] = max(merged[-1][1], end); else: merged.append([start, end]). Return merged.",
        "O(N log N)",
        "O(N)",
        "Updating merged[-1][1] with max() rather than end, because previous interval might completely envelop current one."
      ],
      [
        "Insert Interval",
        57,
        "insert-interval",
        "Medium",
        "Linear Three-Phase Merge",
        [
          "Google",
          "Meta",
          "Amazon"
        ],
        "1. Add intervals ending before new.start. 2. Merge intervals overlapping new. 3. Add intervals starting after new.end.",
        "res = []; i = 0; n = len(intervals). While i < n and intervals[i][1] < new[0]: res.append(intervals[i]); i += 1. While i < n and intervals[i][0] <= new[1]: new[0] = min(new[0], intervals[i][0]); new[1] = max(new[1], intervals[i][1]); i += 1. res.append(new); res.extend(intervals[i:]). Return res.",
        "O(N)",
        "O(N)",
        "Input is already sorted, so linear sweep achieves O(N) without re-sorting."
      ],
      [
        "Non-overlapping Intervals",
        435,
        "non-overlapping-intervals",
        "Medium",
        "Greedy Earliest End Time",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "To minimize removals, keep intervals that finish earliest (leaves maximum room for future intervals).",
        "intervals.sort(key=lambda x: x[1]). end = -inf, count = 0. For s, e in intervals: if s >= end: end = e; else: count += 1. Return count.",
        "O(N log N)",
        "O(1)",
        "Sorting by end time is the key greedy insight."
      ],
      [
        "Meeting Rooms",
        252,
        "meeting-rooms",
        "Easy",
        "Sort & Overlap Check",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Sort by start time. If any interval starts before previous finishes, conflict exists.",
        "intervals.sort(key=lambda x: x[0]). For i in 1..n-1: if intervals[i][0] < intervals[i-1][1]: return False. Return True.",
        "O(N log N)",
        "O(1)",
        "Adjacent boundaries touching [1, 2] and [2, 3] do NOT conflict."
      ],
      [
        "Meeting Rooms II",
        253,
        "meeting-rooms-ii",
        "Medium",
        "Min-Heap / Chronological Sweep",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Track active meeting end times in min-heap.",
        "Sort by start, maintain heap of end times. Return heap size.",
        "O(N log N)",
        "O(N)",
        "Heap top represents earliest ending meeting."
      ],
      [
        "Minimum Number of Arrows to Burst Balloons",
        452,
        "minimum-number-of-arrows-to-burst-balloons",
        "Medium",
        "Greedy Point Selection",
        [
          "Amazon",
          "Google"
        ],
        "Shoot arrow at earliest finishing point of current cluster. Overlapping balloons burst with same arrow.",
        "points.sort(key=lambda x: x[1]). arrows = 1, arrow_pos = points[0][1]. For s, e in points[1:]: if s > arrow_pos: arrows += 1; arrow_pos = e. Return arrows.",
        "O(N log N)",
        "O(1)",
        "Integer overflow in comparator in languages like Java (use Integer.compare)."
      ],
      [
        "Employee Free Time",
        759,
        "employee-free-time",
        "Hard",
        "Interval Merging / Min-Heap",
        [
          "Google",
          "Amazon",
          "Meta"
        ],
        "Flatten all busy intervals, sort by start time, and merge. The gaps between merged intervals are common free time.",
        "Flatten schedules into list of intervals. Sort by start. Merge overlapping. Gaps between merged[i][1] and merged[i+1][0] are free.",
        "O(N log N)",
        "O(N)",
        "Start and end times of free time must be positive length."
      ],
      [
        "Interval List Intersections",
        986,
        "interval-list-intersections",
        "Medium",
        "Two Pointers Max Start / Min End",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Intersection of two intervals [a1, a2] and [b1, b2] is [max(a1, b1), min(a2, b2)]. Valid if start <= end.",
        "i = j = 0. While i < len(A) and j < len(B): s = max(A[i][0], B[j][0]); e = min(A[i][1], B[j][1]); if s <= e: res.append([s, e]); if A[i][1] < B[j][1]: i += 1; else: j += 1. Return res.",
        "O(N + M)",
        "O(1) aux",
        "Advance pointer whose interval finishes earlier (smaller end time)."
      ]
    ]
  },
  {
    "topic": "Recursion",
    "description": "Base cases, call stack unwinding, mathematical recurrence, and tree branches.",
    "icon": "repeat",
    "problems": [
      [
        "Pow(x, n)",
        50,
        "powx-n",
        "Medium",
        "Binary Exponentiation",
        [
          "Meta",
          "Amazon",
          "Google",
          "Bloomberg"
        ],
        "x^n = (x^2)^(n/2) if n is even; x * x^(n-1) if odd. Cuts power in half each step.",
        "def power(x, n): if n == 0: return 1.0; if n < 0: return 1.0 / power(x, -n); half = power(x, n // 2); return half * half if n % 2 == 0 else x * half * half.",
        "O(log N)",
        "O(log N)",
        "n = -2^31: negating -n in 32-bit signed integer causes overflow in C++."
      ],
      [
        "Fibonacci Number",
        509,
        "fibonacci-number",
        "Easy",
        "Iterative / Memoized Recurrence",
        [
          "Amazon"
        ],
        "F(n) = F(n-1) + F(n-2). Base cases F(0)=0, F(1)=1.",
        "a, b = 0, 1. For _ in range(n): a, b = b, a + b. Return a.",
        "O(N)",
        "O(1)",
        "Naive recursion is O(2^N); iterative memoization is O(N) time and O(1) space."
      ],
      [
        "Power of Two",
        231,
        "power-of-two",
        "Easy",
        "Bitwise / Recursive Division",
        [
          "Google",
          "Amazon"
        ],
        "A power of two in binary has exactly one '1' bit: n > 0 and (n & (n - 1)) == 0.",
        "return n > 0 and (n & (n - 1)) == 0.",
        "O(1)",
        "O(1)",
        "n <= 0 are not powers of two."
      ],
      [
        "Reverse String",
        344,
        "reverse-string",
        "Easy",
        "In-Place Two Pointer Swap",
        [
          "Amazon"
        ],
        "Swap s[l] and s[r] while advancing inward.",
        "l, r = 0, len(s) - 1. While l < r: s[l], s[r] = s[r], s[l]; l += 1; r -= 1.",
        "O(N)",
        "O(1)",
        "In-place modification requirement."
      ],
      [
        "Generate Parentheses",
        22,
        "generate-parentheses",
        "Medium",
        "Backtracking Pruning",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Can add '(' if open < n. Can add ')' if close < open.",
        "def backtrack(s, open_c, close_c): if len(s) == 2*n: res.append(s); return; if open_c < n: backtrack(s + '(', open_c + 1, close_c); if close_c < open_c: backtrack(s + ')', open_c, close_c + 1).",
        "O(4^N / sqrt(N))",
        "O(N)",
        "Never add ')' if close_c >= open_c."
      ],
      [
        "Subsets",
        78,
        "subsets",
        "Medium",
        "Include / Exclude Decision Tree",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "At each index, decide whether to include nums[i] or exclude nums[i].",
        "res = []; path = []. def backtrack(start): res.append(list(path)); for i in start..n-1: path.append(nums[i]); backtrack(i + 1); path.pop(). backtrack(0); return res.",
        "O(2^N * N)",
        "O(N)",
        "Append a shallow copy list(path) to res, not the mutable reference path."
      ],
      [
        "Permutations",
        46,
        "permutations",
        "Medium",
        "State Array Backtracking",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Try every unused number at each position.",
        "def backtrack(): if len(path) == n: res.append(list(path)); return; for x in nums: if x not in used: used.add(x); path.append(x); backtrack(); path.pop(); used.remove(x).",
        "O(N! * N)",
        "O(N)",
        "O(1) lookup with boolean array or set for 'used'."
      ],
      [
        "Combination Sum",
        39,
        "combination-sum",
        "Medium",
        "Unbounded Choice Backtracking",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Can reuse same element multiple times. If remain == 0, record. If remain < 0, prune branch.",
        "def backtrack(remain, start): if remain == 0: res.append(list(path)); return; for i in start..n-1: if nums[i] > remain: break; path.append(nums[i]); backtrack(remain - nums[i], i); path.pop(). Sort nums, backtrack(target, 0).",
        "O(2^T)",
        "O(T)",
        "Sort upfront to break early when nums[i] > remain."
      ]
    ]
  },
  {
    "topic": "Backtracking",
    "description": "Exhaustive combinatorial search, constraint propagation, pruning, and state restoration.",
    "icon": "cpu",
    "problems": [
      [
        "Subsets",
        78,
        "subsets",
        "Medium",
        "Power Set Generation",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Generate all 2^N subsets by exploring inclusion/exclusion at each index.",
        "Backtrack with start index: for i in range(start, n): append, recurse(i+1), pop.",
        "O(2^N * N)",
        "O(N)",
        "Appending path vs path[:] copy."
      ],
      [
        "Subsets II",
        90,
        "subsets-ii",
        "Medium",
        "Sort + Duplicate Pruning",
        [
          "Amazon",
          "Meta"
        ],
        "Sort array. Skip duplicate elements at same recursion depth: if i > start and nums[i] == nums[i-1]: continue.",
        "Sort nums. In loop: if i > start and nums[i] == nums[i-1]: continue. Append, recurse(i + 1), pop.",
        "O(2^N * N)",
        "O(N)",
        "Checking i > start rather than i > 0 ensures duplicates across different depths are retained while duplicates at same level are skipped."
      ],
      [
        "Permutations",
        46,
        "permutations",
        "Medium",
        "Full Permutation Generation",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Try all available candidates, track with boolean used array.",
        "Backtrack: loop all candidates, skip if used. Recurse, restore state.",
        "O(N! * N)",
        "O(N)",
        "Restoring state on backtrack."
      ],
      [
        "Permutations II",
        47,
        "permutations-ii",
        "Medium",
        "Sort + Prune Identical Branches",
        [
          "Amazon",
          "Microsoft"
        ],
        "Sort array. If nums[i] == nums[i-1] and not used[i-1], skip to avoid generating identical permutations.",
        "Sort nums. For i in 0..n-1: if used[i]: continue; if i > 0 and nums[i] == nums[i-1] and not used[i-1]: continue; used[i]=True; path.append(nums[i]); backtrack(); path.pop(); used[i]=False.",
        "O(N! * N)",
        "O(N)",
        "Skipping when not used[i-1] enforces picking duplicates in strictly left-to-right order."
      ],
      [
        "Combination Sum",
        39,
        "combination-sum",
        "Medium",
        "Unbounded Backtracking",
        [
          "Amazon",
          "Google"
        ],
        "Pick element, pass i to reuse it. Prune when sum exceeds target.",
        "Backtrack(remain - nums[i], i).",
        "O(2^T)",
        "O(T)",
        "Infinite recursion if 0 is in array (numbers are >= 2 in LC)."
      ],
      [
        "Combination Sum II",
        40,
        "combination-sum-ii",
        "Medium",
        "Single Use + Duplicate Pruning",
        [
          "Amazon",
          "Meta"
        ],
        "Each number used once. Sort. Skip if i > start and nums[i] == nums[i-1]. Recurse with i + 1.",
        "Sort nums. For i in start..n-1: if i > start and nums[i] == nums[i-1]: continue; if nums[i] > remain: break; path.append(nums[i]); backtrack(remain - nums[i], i + 1); path.pop().",
        "O(2^N)",
        "O(N)",
        "Recursing with i + 1 ensures single-use constraint."
      ],
      [
        "Letter Combinations of a Phone Number",
        17,
        "letter-combinations-of-a-phone-number",
        "Medium",
        "Digit Mapping Backtracking",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Map digits to letter strings ('2' -> 'abc'). Branch on each letter for current digit.",
        "mapping = {'2': 'abc', ...}; def backtrack(idx): if idx == len(digits): res.append(''.join(path)); return; for c in mapping[digits[idx]]: path.append(c); backtrack(idx + 1); path.pop().",
        "O(4^N * N)",
        "O(N)",
        "Empty digits string '' should return empty list []."
      ],
      [
        "Word Search",
        79,
        "word-search",
        "Medium",
        "2D Grid DFS with Visited Mask",
        [
          "Amazon",
          "Microsoft",
          "Meta",
          "Google"
        ],
        "From each cell matching word[0], run 4-directional DFS. Temporarily mask visited cell (e.g. grid[r][c] = '#'), restore after.",
        "def dfs(r, c, i): if i == len(word): return True; if out of bounds or grid[r][c] != word[i]: return False; temp = grid[r][c]; grid[r][c] = '#'; found = any(dfs(nr, nc, i+1) for nr, nc in neighbors); grid[r][c] = temp; return found.",
        "O(R * C * 3^L)",
        "O(L)",
        "Restoring grid[r][c] = temp on backtrack. Prune: reverse word if word[-1] is rarer than word[0]."
      ],
      [
        "N-Queens",
        51,
        "n-queens",
        "Hard",
        "Column & Diagonal Constraint Sets",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft"
        ],
        "Place queen row by row. Track occupied columns, positive diagonals (r + c), and negative diagonals (r - c).",
        "cols = set(), diag1 = set(), diag2 = set(). def place(r): if r == n: build_board(); return; for c in range(n): if c in cols or (r+c) in diag1 or (r-c) in diag2: continue; add sets; place(r + 1); remove sets.",
        "O(N!)",
        "O(N)",
        "r + c identifies anti-diagonals, r - c identifies main diagonals."
      ],
      [
        "Sudoku Solver",
        37,
        "sudoku-solver",
        "Hard",
        "Exact Cover Constraint Backtracking",
        [
          "Google",
          "Microsoft",
          "Amazon"
        ],
        "Find empty cell. Try digits '1'-'9'. Verify row, col, and 3x3 box constraints. If valid, recurse. Backtrack if dead end.",
        "def solve(): for r in 0..8: for c in 0..8: if board[r][c] == '.': for d in '1'..'9': if is_valid(r, c, d): board[r][c] = d; if solve(): return True; board[r][c] = '.'; return False; return True.",
        "O(9^(empty cells))",
        "O(1) (81 cells)",
        "Returning boolean True/False stops search immediately on first valid solved board."
      ]
    ]
  },
  {
    "topic": "Greedy",
    "description": "Locally optimal choices yielding global optimums, jump games, and gas stations.",
    "icon": "trending-up",
    "problems": [
      [
        "Best Time to Buy and Sell Stock",
        121,
        "best-time-to-buy-and-sell-stock",
        "Easy",
        "Prefix Minimum Greedy",
        [
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "Track running min price. Max profit is price - min_price.",
        "Greedy single pass updating min_price and max_profit.",
        "O(N)",
        "O(1)",
        "Selling on future days only."
      ],
      [
        "Jump Game",
        55,
        "jump-game",
        "Medium",
        "Farthest Reachable Index",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft"
        ],
        "Maintain max_reach seen so far. If current index i > max_reach, you are stuck.",
        "max_reach = 0. For i, jump in enumerate(nums): if i > max_reach: return False; max_reach = max(max_reach, i + jump); if max_reach >= n - 1: return True. Return True.",
        "O(N)",
        "O(1)",
        "Early exit if max_reach >= n - 1."
      ],
      [
        "Jump Game II",
        45,
        "jump-game-ii",
        "Medium",
        "BFS-Style Greedy Windows",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Current jump covers range [cur_end..cur_end]. Find max reachable within current window, advance window boundary.",
        "jumps = 0, cur_end = 0, farthest = 0. For i in range(n - 1): farthest = max(farthest, i + nums[i]); if i == cur_end: jumps += 1; cur_end = farthest. Return jumps.",
        "O(N)",
        "O(1)",
        "Loop up to n - 2, because when at n - 1 you have already reached the end."
      ],
      [
        "Gas Station",
        134,
        "gas-station",
        "Medium",
        "Global vs Local Deficit Greedy",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "If total gas >= total cost, a solution is guaranteed to exist. If tank drops below 0 at station i, starting station must be i + 1.",
        "total_tank = 0, cur_tank = 0, start = 0. For i in range(n): diff = gas[i] - cost[i]; total_tank += diff; cur_tank += diff; if cur_tank < 0: start = i + 1; cur_tank = 0. Return start if total_tank >= 0 else -1.",
        "O(N)",
        "O(1)",
        "No need to simulate circular tour from start; total_tank >= 0 mathematically guarantees completion."
      ],
      [
        "Partition Labels",
        763,
        "partition-labels",
        "Medium",
        "Last Occurrence Window Expansion",
        [
          "Amazon",
          "Google"
        ],
        "Find last occurrence of each character. A partition must extend until all characters inside have completed their last occurrence.",
        "last = {c: i for i, c in enumerate(s)}. start = 0, end = 0, res = []. For i, c in enumerate(s): end = max(end, last[c]); if i == end: res.append(end - start + 1); start = i + 1. Return res.",
        "O(N)",
        "O(1) (26 letters)",
        "Updating end = max(end, last[c]) guarantees all characters inside window stay inside partition."
      ],
      [
        "Assign Cookies",
        455,
        "assign-cookies",
        "Easy",
        "Two Pointers Greedy Match",
        [
          "Amazon"
        ],
        "Sort children greeds and cookie sizes. Give smallest sufficient cookie to least greedy child.",
        "g.sort(); s.sort(). i = j = 0. While i < len(g) and j < len(s): if s[j] >= g[i]: i += 1; j += 1. Return i.",
        "O(N log N + M log M)",
        "O(1)",
        "Sorting both arrays allows optimal greedy matching."
      ],
      [
        "Maximum Subarray",
        53,
        "maximum-subarray",
        "Medium",
        "Kadane's Greedy Restart",
        [
          "Amazon",
          "Microsoft"
        ],
        "Reset running sum when it becomes negative.",
        "cur_sum = max(x, cur_sum + x).",
        "O(N)",
        "O(1)",
        "All negative numbers case."
      ],
      [
        "Non-overlapping Intervals",
        435,
        "non-overlapping-intervals",
        "Medium",
        "Earliest End Time Removal",
        [
          "Meta",
          "Amazon"
        ],
        "Keep intervals that finish earliest to leave room for others.",
        "Sort by end time. Count non-conflicting.",
        "O(N log N)",
        "O(1)",
        "Sorting by end vs start."
      ],
      [
        "Task Scheduler",
        621,
        "task-scheduler",
        "Medium",
        "Frequency Chunk Math",
        [
          "Meta",
          "Amazon"
        ],
        "Max frequency sets the baseline grid of chunks.",
        "(max_f - 1) * (n + 1) + count of tasks with max_f.",
        "O(N)",
        "O(1)",
        "Total tasks can exceed formula when idle slots fill up."
      ],
      [
        "Hand of Straights",
        846,
        "hand-of-straights",
        "Medium",
        "Sorted Map / Frequency Greedy",
        [
          "Google"
        ],
        "Smallest available card must start a group of size groupSize: [x, x+1, ..., x+groupSize-1]. Decrement counts.",
        "counts = Counter(hand). For x in sorted(counts): if counts[x] > 0: need = counts[x]; for k in range(groupSize): if counts[x + k] < need: return False; counts[x + k] -= need. Return True.",
        "O(N log N)",
        "O(N)",
        "len(hand) % groupSize != 0 check upfront."
      ]
    ]
  },
  {
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "description": "Adjacency lists, connected components, cycle detection, topological sort, Dijkstra, and Bellman-Ford.",
    "icon": "share-2",
    "problems": [
      [
        "Number of Islands",
        200,
        "number-of-islands",
        "Medium",
        "Grid BFS/DFS Connected Components",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft",
          "Bloomberg"
        ],
        "Iterate cells. When '1' encountered, increment island count and run BFS/DFS to sink all connected '1's to '0'.",
        "For r in 0..R-1: for c in 0..C-1: if grid[r][c] == '1': islands += 1; sink_dfs(r, c). sink_dfs sets grid[r][c] = '0' and explores 4 directions.",
        "O(R * C)",
        "O(R * C)",
        "Call stack overflow on very large grids in DFS; BFS or iterative DFS avoids stack depth limits."
      ],
      [
        "Clone Graph",
        133,
        "clone-graph",
        "Medium",
        "DFS / BFS Node Hash Map",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Map original node to cloned node. When visiting a node, clone it, add to map, and recursively clone its neighbors.",
        "cloned = {}. def clone(node): if not node: return None; if node in cloned: return cloned[node]; copy = Node(node.val); cloned[node] = copy; copy.neighbors = [clone(n) for n in node.neighbors]; return copy. Return clone(node).",
        "O(V + E)",
        "O(V)",
        "Graph with cycles will cause infinite recursion without cloned cache."
      ],
      [
        "Max Area of Island",
        695,
        "max-area-of-island",
        "Medium",
        "Grid DFS Area Accumulator",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Similar to Number of Islands, but DFS returns 1 + sum of areas of 4 adjacent neighbors.",
        "def dfs(r, c): if out of bounds or grid[r][c] != 1: return 0; grid[r][c] = 0; return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1). max_area = max(dfs(r, c) for r, c in all cells).",
        "O(R * C)",
        "O(R * C)",
        "Sinking grid[r][c] = 0 prevents revisiting."
      ],
      [
        "Pacific Atlantic Water Flow",
        417,
        "pacific-atlantic-water-flow",
        "Medium",
        "Reverse Multi-Source BFS/DFS",
        [
          "Google",
          "Amazon"
        ],
        "Water flows downhill from cells to oceans. Instead, reverse: flow uphill from Pacific borders and Atlantic borders. Find intersection.",
        "Run DFS from Pacific border cells (top row, left col). Run DFS from Atlantic border cells (bottom row, right col). Only traverse to neighbors with height >= current cell. Return cells visited by both.",
        "O(R * C)",
        "O(R * C)",
        "Flowing from every cell to oceans causes TLE; reverse traversal from oceans to cells is linear."
      ],
      [
        "Surrounded Regions",
        130,
        "surrounded-regions",
        "Medium",
        "Boundary Connected Component DFS",
        [
          "Amazon",
          "Google"
        ],
        "Any 'O' connected to the board boundary cannot be captured. Mark boundary-connected 'O's with 'E', flip remaining 'O's to 'X', restore 'E' to 'O'.",
        "1. DFS from all 4 boundaries marking 'O' as 'E'. 2. Sweep entire grid: if 'O' -> 'X'; if 'E' -> 'O'.",
        "O(R * C)",
        "O(R * C)",
        "Only 'O's completely enclosed by 'X' on all 4 sides are captured."
      ],
      [
        "Rotting Oranges",
        994,
        "rotting-oranges",
        "Medium",
        "Multi-Source BFS Queue",
        [
          "Amazon",
          "Microsoft",
          "Meta"
        ],
        "Start BFS simultaneously from all rotten oranges.",
        "Layer-by-layer BFS rotting fresh oranges. Return minutes.",
        "O(R * C)",
        "O(R * C)",
        "Check if any fresh oranges remain."
      ],
      [
        "Word Ladder",
        127,
        "word-ladder",
        "Hard",
        "Bidirectional BFS Shortest Path",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Shortest transformation sequence is shortest path in unweighted graph. Word transitions differ by 1 letter.",
        "word_set = set(wordList). q = deque([(beginWord, 1)]). While q: word, steps = q.popleft(); if word == endWord: return steps; for i in range(len(word)): for c in 'a'..'z': next_w = word[:i] + c + word[i+1:]; if next_w in word_set: word_set.remove(next_w); q.append((next_w, steps + 1)). Return 0.",
        "O(M^2 * N)",
        "O(M * N)",
        "Removing words from word_set upon queueing prevents revisiting and loops."
      ],
      [
        "Number of Connected Components in an Undirected Graph",
        323,
        "number-of-connected-components-in-an-undirected-graph",
        "Medium",
        "Union Find / DFS",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Count isolated clusters in an undirected graph.",
        "Build adjacency list. Iterate nodes, run DFS if unvisited, increment count.",
        "O(V + E)",
        "O(V + E)",
        "Disconnected nodes with 0 edges are still distinct components."
      ],
      [
        "Graph Valid Tree",
        261,
        "graph-valid-tree",
        "Medium",
        "Cycle Detection + Connectivity",
        [
          "Google",
          "Meta",
          "Amazon"
        ],
        "A valid tree with n nodes must have exactly n - 1 edges AND be fully connected (no cycles).",
        "If len(edges) != n - 1: return False. Build adjacency list. Run BFS/DFS from node 0. Return len(visited) == n.",
        "O(V + E)",
        "O(V + E)",
        "Checking edge count == n - 1 eliminates cycle checking if graph is connected."
      ],
      [
        "Course Schedule",
        207,
        "course-schedule",
        "Medium",
        "Topological Sort / Kahn's / Cycle Detection",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft"
        ],
        "Prerequisites form a directed graph. Can finish all courses if and only if graph has NO directed cycles.",
        "Compute in-degrees. q = deque(nodes with in_degree 0). While q: u = q.popleft(); count += 1; for v in adj[u]: in_degree[v] -= 1; if in_degree[v] == 0: q.append(v). Return count == numCourses.",
        "O(V + E)",
        "O(V + E)",
        "Self-loops or mutual dependencies (e.g. 0->1, 1->0) leave in-degrees > 0, detecting cycle."
      ],
      [
        "Course Schedule II",
        210,
        "course-schedule-ii",
        "Medium",
        "Topological Sort Ordering",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Same as Course Schedule I, but record order of nodes popped from queue.",
        "Kahn's algorithm: append popped node to order. Return order if len(order) == numCourses else [].",
        "O(V + E)",
        "O(V + E)",
        "If cycle exists, return empty array []."
      ],
      [
        "Word Search",
        79,
        "word-search",
        "Medium",
        "2D Grid DFS",
        [
          "Amazon",
          "Microsoft"
        ],
        "Backtracking DFS on grid cells.",
        "Match characters, mask visited, explore 4 neighbors.",
        "O(R * C * 3^L)",
        "O(L)",
        "Restoring visited state."
      ],
      [
        "Network Delay Time",
        743,
        "network-delay-time",
        "Medium",
        "Dijkstra's Shortest Path",
        [
          "Google",
          "Amazon"
        ],
        "Find time for signal to reach all nodes. Shortest path from source k to all nodes in directed weighted graph with non-negative weights.",
        "adj = defaultdict(list). For u, v, w in times: adj[u].append((v, w)). pq = [(0, k)]. dist = {}. While pq: d, u = heappop(pq); if u in dist: continue; dist[u] = d; for v, w in adj[u]: if v not in dist: heappush(pq, (d + w, v)). Return max(dist.values()) if len(dist) == n else -1.",
        "O(E log V)",
        "O(V + E)",
        "Dijkstra requires non-negative weights. If graph disconnected, return -1."
      ],
      [
        "Cheapest Flights Within K Stops",
        787,
        "cheapest-flights-within-k-stops",
        "Medium",
        "Bellman-Ford / Modified Dijkstra",
        [
          "Amazon",
          "Google",
          "Airbnb"
        ],
        "Find cheapest price with at most k stops (k + 1 edges). Bellman-Ford runs k + 1 relaxation passes.",
        "prices = [inf] * n; prices[src] = 0. For _ in range(k + 1): temp = list(prices); for u, v, p in flights: temp[v] = min(temp[v], prices[u] + p); prices = temp. Return prices[dst] if prices[dst] != inf else -1.",
        "O(K * E)",
        "O(V)",
        "Must use temp copy of prices to avoid chaining more than 1 edge per relaxation step."
      ],
      [
        "Dijkstra Implementation",
        743,
        "network-delay-time",
        "Medium",
        "Priority Queue Dijkstra Template",
        [
          "Google",
          "Uber",
          "Amazon"
        ],
        "Standard Dijkstra single-source shortest path template using min-heap.",
        "Maintain dist array initialized to infinity. Push (0, src) to heap. Pop shortest, update neighbors, push improvements.",
        "O(E log V)",
        "O(V + E)",
        "Skip popped entries where dist[u] < popped_dist (stale heap entries)."
      ],
      [
        "Bellman-Ford Basics",
        787,
        "cheapest-flights-within-k-stops",
        "Medium",
        "Edge Relaxation",
        [
          "Google",
          "Uber"
        ],
        "Relax all E edges V-1 times. Detects negative weight cycles.",
        "For i in 1..V-1: for u, v, w in edges: dist[v] = min(dist[v], dist[u] + w).",
        "O(V * E)",
        "O(V)",
        "Can handle negative weights unlike Dijkstra."
      ],
      [
        "Shortest Path in Binary Matrix",
        1091,
        "shortest-path-in-binary-matrix",
        "Medium",
        "8-Directional BFS",
        [
          "Meta",
          "Amazon"
        ],
        "Unweighted shortest path from top-left to bottom-right.",
        "BFS queue with (r, c, dist). Mark visited.",
        "O(N^2)",
        "O(N^2)",
        "Diagonal moves permitted."
      ],
      [
        "Path With Minimum Effort",
        1631,
        "path-with-minimum-effort",
        "Medium",
        "Dijkstra on Maximum Edge Weight",
        [
          "Google",
          "Amazon"
        ],
        "Effort of path is maximum absolute difference between consecutive cells. Find path minimizing this max effort.",
        "Dijkstra where edge weight is abs(height[nr][nc] - height[r][c]). Min-heap stores (effort, r, c). Pop min effort, relax 4 neighbors with max(effort, diff).",
        "O(R * C log(R * C))",
        "O(R * C)",
        "Can also be solved via Binary Search on answer effort in range [0, 10^6] with BFS validation."
      ]
    ]
  },
  {
    "topic": "Union Find / DSU",
    "description": "Disjoint Set Union with path compression and union by rank/size. Dynamic connectivity and cycle detection.",
    "icon": "git-merge",
    "problems": [
      [
        "Number of Connected Components in an Undirected Graph",
        323,
        "number-of-connected-components-in-an-undirected-graph",
        "Medium",
        "DSU Component Counting",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "Start with n components. For each edge (u, v), union(u, v). If union merges two disjoint sets, decrement components.",
        "parent = list(range(n)), rank = [1]*n, count = n. def find(i): if parent[i] != i: parent[i] = find(parent[i]); return parent[i]. def union(i, j): ... return count.",
        "O(E * alpha(V))",
        "O(V)",
        "Path compression reduces find to nearly O(1) amortized."
      ],
      [
        "Redundant Connection",
        684,
        "redundant-connection",
        "Medium",
        "DSU Cycle Detection",
        [
          "Google",
          "Amazon",
          "Meta"
        ],
        "A tree with n nodes and n edges has exactly one cycle. The edge whose two vertices are already in same component completes the cycle.",
        "For u, v in edges: if find(u) == find(v): return [u, v]; union(u, v).",
        "O(N * alpha(N))",
        "O(N)",
        "Return the last edge in the input that caused the cycle."
      ],
      [
        "Accounts Merge",
        721,
        "accounts-merge",
        "Medium",
        "DSU Email Grouping",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Union all emails belonging to the same account. Group emails by their root parent email, sort, and prepend account name.",
        "Map email -> index. Union all adjacent emails in each account. Group emails by find(email), sort emails, add account name.",
        "O(N * K log K)",
        "O(N * K)",
        "Different people can have identical names. Never union names; only union shared emails."
      ],
      [
        "Number of Provinces",
        547,
        "number-of-provinces",
        "Medium",
        "Adjacency Matrix DSU",
        [
          "Amazon",
          "Microsoft",
          "Google"
        ],
        "Connected cities form a province. Union(i, j) for all isConnected[i][j] == 1.",
        "n = len(isConnected). DSU with count = n. For i in 0..n-1: for j in i+1..n-1: if isConnected[i][j]: union(i, j). Return dsu.count.",
        "O(N^2 * alpha(N))",
        "O(N)",
        "Undirected graph; only need to check j > i in upper triangle."
      ],
      [
        "Most Stones Removed with Same Row or Column",
        947,
        "most-stones-removed-with-same-row-or-column",
        "Medium",
        "DSU Row/Col Bipartite Union",
        [
          "Google",
          "Amazon"
        ],
        "Stones sharing row or col belong to same connected component. Within any connected component of size S, we can remove S - 1 stones. Answer = total_stones - number_of_components.",
        "Union row r with col ~c (bitwise not ~c to differentiate col namespace from row namespace). Total stones minus number of unique root parents.",
        "O(N * alpha(N))",
        "O(N)",
        "Separate row namespace from column namespace (e.g. r and c + 10001)."
      ],
      [
        "Min Cost to Connect All Points (Kruskal's MST)",
        1584,
        "min-cost-to-connect-all-points",
        "Medium",
        "Kruskal's Algorithm / Prim's",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Minimum Spanning Tree (MST) on complete graph. All pairwise Manhattan distances. Sort edges by weight, union until n - 1 edges.",
        "Build all N*(N-1)/2 edges (dist, i, j). Sort by dist. Iterate edges: if union(i, j): total_cost += dist, edges_count += 1. If edges_count == n - 1: break. Return total_cost.",
        "O(N^2 log N)",
        "O(N^2)",
        "Prim's algorithm with min-heap avoids generating all edges upfront, achieving O(N^2) time and O(N) space."
      ]
    ]
  },
  {
    "topic": "Trie (Prefix Tree)",
    "description": "Prefix lookups, word dictionaries, autocomplete search, and bitwise XOR tries.",
    "icon": "folder-plus",
    "problems": [
      [
        "Implement Trie (Prefix Tree)",
        208,
        "implement-trie-prefix-tree",
        "Medium",
        "Tree of Character Arrays",
        [
          "Amazon",
          "Google",
          "Microsoft",
          "Meta"
        ],
        "Each node has a 26-child dictionary and an is_end boolean flag.",
        "insert(word): traverse/create children, mark is_end = True. search(word): traverse, return is_end. startsWith(prefix): traverse, return True if prefix exists.",
        "O(L) per op",
        "O(Total Chars * 26)",
        "distinguishing between startsWith (node exists) and search (is_end must be True)."
      ],
      [
        "Design Add and Search Words Data Structure",
        211,
        "design-add-and-search-words-data-structure",
        "Medium",
        "Trie DFS with Wildcard '.'",
        [
          "Meta",
          "Amazon",
          "Google"
        ],
        "Standard Trie, but when '.' encountered, recursively branch through all 26 existing children.",
        "dfs(node, idx): if idx == len(word): return node.is_end. c = word[idx]. If c == '.': return any(dfs(child, idx + 1) for child in node.children.values()). Else: if c not in node.children: return False; return dfs(node.children[c], idx + 1).",
        "O(L) best, O(26^L) worst",
        "O(Total Chars)",
        "Wildcard '.' branching."
      ],
      [
        "Word Search II",
        212,
        "word-search-ii",
        "Hard",
        "Grid DFS + Trie Pruning",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft"
        ],
        "Searching for multiple words in grid: build Trie of all words, then run single DFS from each grid cell traversing matching Trie branches.",
        "Build Trie. For r, c in all cells: dfs(r, c, root). If node has word, add to res and remove word from node to avoid duplicates. If node has no children, prune from parent.",
        "O(R * C * 3^L)",
        "O(Total Chars)",
        "Pruning Trie nodes when words are found dramatically speeds up runtime from TLE to top 5%."
      ],
      [
        "Replace Words",
        648,
        "replace-words",
        "Medium",
        "Trie Shortest Prefix Search",
        [
          "Google",
          "Amazon"
        ],
        "Find shortest root prefix for each word in sentence.",
        "Insert dictionary roots into Trie. For each word in sentence, search Trie for shortest prefix where is_end is True.",
        "O(D * L + S)",
        "O(D * L)",
        "Stop at first is_end match to get the shortest root."
      ],
      [
        "Maximum XOR of Two Numbers in an Array",
        421,
        "maximum-xor-of-two-numbers-in-an-array",
        "Medium",
        "Binary Bitwise Trie",
        [
          "Google",
          "Amazon"
        ],
        "Insert 32-bit binary representations into binary Trie. For each number, greedily choose opposite bit (1 - bit) at each step to maximize XOR.",
        "Insert numbers into Trie of bits 0/1. For each number, query Trie by trying to traverse opposite bit (bit ^ 1). Accumulate max XOR.",
        "O(32 * N)",
        "O(32 * N)",
        "Bit shifting from MSB (31) down to LSB (0)."
      ],
      [
        "Longest Word in Dictionary",
        720,
        "longest-word-in-dictionary",
        "Medium",
        "Trie DFS / Hash Set",
        [
          "Google",
          "Amazon"
        ],
        "Word can be built one character at a time if all its prefixes exist in dictionary.",
        "Insert words into Trie. BFS/DFS only traversing children where is_end is True. Track longest lexicographical word.",
        "O(Total Chars)",
        "O(Total Chars)",
        "Lexicographical tiebreaker rule."
      ]
    ]
  },
  {
    "topic": "Dynamic Programming (1D)",
    "description": "Optimal substructure, overlapping subproblems, state transitions, and linear memoization.",
    "icon": "zap",
    "problems": [
      [
        "Climbing Stairs",
        70,
        "climbing-stairs",
        "Easy",
        "Fibonacci Recurrence",
        [
          "Amazon",
          "Google",
          "Apple"
        ],
        "To reach step n, you must jump from step n-1 or n-2: dp[n] = dp[n-1] + dp[n-2].",
        "a, b = 1, 1. For _ in range(n - 1): a, b = b, a + b. Return b.",
        "O(N)",
        "O(1)",
        "Base cases n=1 and n=2."
      ],
      [
        "Min Cost Climbing Stairs",
        746,
        "min-cost-climbing-stairs",
        "Easy",
        "Linear Cost Minimization",
        [
          "Amazon",
          "Google"
        ],
        "dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Cost to reach top floor.",
        "a, b = cost[0], cost[1]. For i in 2..n-1: a, b = b, cost[i] + min(a, b). Return min(a, b).",
        "O(N)",
        "O(1)",
        "The top of floor is past the last index."
      ],
      [
        "House Robber",
        198,
        "house-robber",
        "Medium",
        "Rob / Skip State Machine",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft"
        ],
        "Cannot rob two adjacent houses. For house i: rob i (nums[i] + prev2) OR skip i (prev1).",
        "prev2, prev1 = 0, 0. For x in nums: prev2, prev1 = prev1, max(prev1, prev2 + x). Return prev1.",
        "O(N)",
        "O(1)",
        "Only 2 previous states needed; reduces space from O(N) to O(1)."
      ],
      [
        "House Robber II",
        213,
        "house-robber-ii",
        "Medium",
        "Circular Array Decomposition",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Houses are in a circle. You cannot rob both first and last house. Run House Robber I on nums[1:] and nums[:-1]. Take max.",
        "if len(nums) == 1: return nums[0]. Return max(rob_linear(nums[1:]), rob_linear(nums[:-1])).",
        "O(N)",
        "O(1)",
        "Single house edge case len(nums) == 1."
      ],
      [
        "Decode Ways",
        91,
        "decode-ways",
        "Medium",
        "Linear Parsing Decisions",
        [
          "Meta",
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Single digit decode if s[i] != '0'. Two digit decode if 10 <= int(s[i-1:i+1]) <= 26.",
        "dp = [0]*(n+1); dp[0] = 1; dp[1] = 1 if s[0] != '0' else 0. For i in 2..n: if s[i-1] != '0': dp[i] += dp[i-1]; if 10 <= int(s[i-2:i]) <= 26: dp[i] += dp[i-2]. Return dp[n].",
        "O(N)",
        "O(1)",
        "Leading zeros '06' cannot be decoded. '0' can only decode as part of '10' or '20'."
      ],
      [
        "Coin Change",
        322,
        "coin-change",
        "Medium",
        "Unbounded Knapsack Minimization",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft"
        ],
        "dp[a] = fewest coins to make amount a. dp[a] = min(dp[a - coin] + 1 for coin in coins).",
        "dp = [inf] * (amount + 1); dp[0] = 0. For a in 1..amount: for c in coins: if a >= c: dp[a] = min(dp[a], dp[a - c] + 1). Return dp[amount] if dp[amount] != inf else -1.",
        "O(Amount * N)",
        "O(Amount)",
        "Initialize dp with infinity, dp[0] with 0."
      ],
      [
        "Maximum Product Subarray",
        152,
        "maximum-product-subarray",
        "Medium",
        "Min & Max Product Pair",
        [
          "Google",
          "Amazon"
        ],
        "Multiplying by negative flips min and max.",
        "Track cur_max and cur_min.",
        "O(N)",
        "O(1)",
        "Zeroes in array."
      ],
      [
        "Word Break",
        139,
        "word-break",
        "Medium",
        "String Partitioning DP",
        [
          "Amazon",
          "Meta",
          "Google",
          "Microsoft",
          "Bloomberg"
        ],
        "dp[i] is True if s[:i] can be segmented into dictionary words. dp[i] = any(dp[j] and s[j:i] in dict for j in 0..i-1).",
        "dp = [False] * (n + 1); dp[0] = True. words = set(wordDict). For i in 1..n: for j in 0..i-1: if dp[j] and s[j:i] in words: dp[i] = True; break. Return dp[n].",
        "O(N^2 * L)",
        "O(N)",
        "Prune inner loop by only checking lengths up to max_word_len in dict."
      ],
      [
        "Longest Increasing Subsequence",
        300,
        "longest-increasing-subsequence",
        "Medium",
        "Patience Sorting / Binary Search",
        [
          "Amazon",
          "Google",
          "Microsoft",
          "Meta"
        ],
        "Tails array stores smallest tail of all increasing subsequences of length i + 1. Binary search insertion point.",
        "tails = []. For x in nums: idx = bisect_left(tails, x); if idx == len(tails): tails.append(x); else: tails[idx] = x. Return len(tails).",
        "O(N log N)",
        "O(N)",
        "Classic DP is O(N^2); patience sorting with bisect_left achieves O(N log N)."
      ],
      [
        "Partition Equal Subset Sum",
        416,
        "partition-equal-subset-sum",
        "Medium",
        "0/1 Knapsack Target Sum",
        [
          "Amazon",
          "Meta",
          "Google"
        ],
        "Equal partition means finding subset summing to sum(nums) // 2. Impossible if sum is odd.",
        "total = sum(nums); if total % 2 != 0: return False; target = total // 2. dp = {0}. For x in nums: dp |= {s + x for s in dp if s + x <= target}; if target in dp: return True. Return False.",
        "O(N * Target)",
        "O(Target)",
        "Bitset representation `dp |= (dp << num)` achieves extreme speed."
      ]
    ]
  },
  {
    "topic": "Dynamic Programming (2D)",
    "description": "Grid paths, string edit distance, longest common subsequence, and knapsack variations.",
    "icon": "grid",
    "problems": [
      [
        "Unique Paths",
        62,
        "unique-paths",
        "Medium",
        "Grid Combinatorics / 2D DP",
        [
          "Google",
          "Amazon",
          "Microsoft"
        ],
        "dp[r][c] = dp[r-1][c] + dp[r][c-1]. Top and left edge are all 1.",
        "row = [1] * n. For _ in range(m - 1): for c in 1..n-1: row[c] += row[c - 1]. Return row[-1].",
        "O(M * N)",
        "O(N)",
        "Combinatorial formula: (m + n - 2)! / ((m - 1)! * (n - 1)!)."
      ],
      [
        "Unique Paths II",
        63,
        "unique-paths-ii",
        "Medium",
        "Grid DP with Obstacles",
        [
          "Amazon",
          "Google"
        ],
        "If cell has obstacle (grid[r][c] == 1), dp[r][c] = 0. Else dp[r][c] = dp[r-1][c] + dp[r][c-1].",
        "dp = [0] * n; dp[0] = 1 if obstacleGrid[0][0] == 0 else 0. For r in range(m): for c in range(n): if obstacleGrid[r][c] == 1: dp[c] = 0; elif c > 0: dp[c] += dp[c-1]. Return dp[-1].",
        "O(M * N)",
        "O(N)",
        "Starting cell or ending cell contains obstacle; return 0."
      ],
      [
        "Minimum Path Sum",
        64,
        "minimum-path-sum",
        "Medium",
        "Grid Cost Minimization",
        [
          "Amazon",
          "Google"
        ],
        "dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]).",
        "In-place or 1D array: dp[c] = grid[r][c] + min(dp[c], dp[c-1]).",
        "O(M * N)",
        "O(N)",
        "First row and first col can only come from one direction."
      ],
      [
        "Longest Common Subsequence",
        1143,
        "longest-common-subsequence",
        "Medium",
        "2D String Alignment Matrix",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft"
        ],
        "If text1[i] == text2[j], dp[i][j] = 1 + dp[i-1][j-1]. Else dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
        "dp = [[0]*(n+1) for _ in range(m+1)]. For i in 1..m: for j in 1..n: if text1[i-1] == text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]; else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Return dp[m][n].",
        "O(M * N)",
        "O(min(M, N))",
        "Subsequence (not substring) allows non-contiguous matching."
      ],
      [
        "Edit Distance",
        72,
        "edit-distance",
        "Medium",
        "Levenshtein Distance Matrix",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Insert: dp[i][j-1] + 1. Delete: dp[i-1][j] + 1. Replace: dp[i-1][j-1] + 1 (or 0 if characters match).",
        "dp = [[0]*(n+1) for _ in range(m+1)]. Base cases dp[i][0] = i, dp[0][j] = j. If word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]; else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
        "O(M * N)",
        "O(min(M, N))",
        "Off-by-one indexing with 1-based DP table."
      ],
      [
        "Longest Palindromic Subsequence",
        516,
        "longest-palindromic-subsequence",
        "Medium",
        "LCS with Reversed String / Interval DP",
        [
          "Amazon",
          "Google"
        ],
        "LPS of s equals the Longest Common Subsequence of s and reverse(s).",
        "Return LCS(s, s[::-1]). Or interval DP: if s[i] == s[j]: dp[i][j] = 2 + dp[i+1][j-1]; else max(dp[i+1][j], dp[i][j-1]).",
        "O(N^2)",
        "O(N)",
        "Subsequence vs substring distinction."
      ],
      [
        "Coin Change II",
        518,
        "coin-change-ii",
        "Medium",
        "Unbounded Knapsack Combinations",
        [
          "Amazon",
          "Google"
        ],
        "Count ways to make amount. Outer loop over coins, inner loop over amounts (avoids duplicate permutations).",
        "dp = [0] * (amount + 1); dp[0] = 1. For c in coins: for a in c..amount: dp[a] += dp[a - c]. Return dp[amount].",
        "O(N * Amount)",
        "O(Amount)",
        "Coins loop outside prevents counting [1, 2] and [2, 1] as distinct combinations."
      ],
      [
        "Interleaving String",
        97,
        "interleaving-string",
        "Medium",
        "2D String Transition Grid",
        [
          "Amazon",
          "Google"
        ],
        "s3[i+j-1] must match either s1[i-1] (coming from top) or s2[j-1] (coming from left).",
        "If len(s1) + len(s2) != len(s3): return False. dp[j] boolean for column. dp[j] = (dp[j] and s1[i-1] == s3[i+j-1]) or (dp[j-1] and s2[j-1] == s3[i+j-1]).",
        "O(M * N)",
        "O(N)",
        "Length check upfront: len(s1) + len(s2) == len(s3)."
      ],
      [
        "Distinct Subsequences",
        115,
        "distinct-subsequences",
        "Hard",
        "2D Subsequence Matching Counts",
        [
          "Google",
          "Amazon"
        ],
        "dp[i][j] = number of distinct subsequences of s[:i] matching t[:j]. If s[i-1] == t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; else dp[i-1][j].",
        "dp = [1] + [0] * n. For c in s: for j in range(n, 0, -1): if c == t[j-1]: dp[j] += dp[j-1]. Return dp[n].",
        "O(M * N)",
        "O(N)",
        "Reverse inner loop when rolling 1D array to avoid using updated values from same step."
      ],
      [
        "Regular Expression Matching",
        10,
        "regular-expression-matching",
        "Hard",
        "Regex State Machine 2D DP",
        [
          "Google",
          "Meta",
          "Amazon"
        ],
        "'.' matches any char. '*' matches 0 or more of preceding element: match 0 times (dp[i][j-2]) or match 1+ times (dp[i-1][j] if char matches).",
        "dp[0][0] = True. Initialize empty string matches with patterns like 'a*b*'. Transition based on '.' and '*'.",
        "O(M * N)",
        "O(M * N)",
        "'*' requires looking back 2 columns in pattern."
      ]
    ]
  },
  {
    "topic": "Dynamic Programming (Advanced)",
    "description": "Stock state machines, interval DP, matrix exponentiation, and 2D monotonic stack DP.",
    "icon": "shield-check",
    "problems": [
      [
        "Best Time to Buy and Sell Stock with Cooldown",
        309,
        "best-time-to-buy-and-sell-stock-with-cooldown",
        "Medium",
        "State Machine (Hold, Sold, Rest)",
        [
          "Amazon",
          "Google"
        ],
        "Three states: Hold (bought stock), Sold (just sold, entering cooldown), Rest (can buy).",
        "hold = -inf, sold = 0, rest = 0. For p in prices: prev_sold = sold; sold = hold + p; hold = max(hold, rest - p); rest = max(rest, prev_sold). Return max(sold, rest).",
        "O(N)",
        "O(1)",
        "Must cooldown for 1 day after selling before buying again."
      ],
      [
        "Best Time to Buy and Sell Stock IV",
        188,
        "best-time-to-buy-and-sell-stock-iv",
        "Hard",
        "K Transactions State Arrays",
        [
          "Amazon",
          "Google",
          "Meta"
        ],
        "At most k transactions. Track buy[j] and sell[j] for j in 1..k.",
        "If k >= n // 2: solve like unlimited transactions. Else: buy = [-inf]*(k+1), sell = [0]*(k+1). For p in prices: for j in 1..k: buy[j] = max(buy[j], sell[j-1] - p); sell[j] = max(sell[j], buy[j] + p). Return sell[k].",
        "O(N * K)",
        "O(K)",
        "k >= n // 2 shortcut prevents allocating massive O(N * K) tables when k is huge."
      ],
      [
        "Burst Balloons",
        312,
        "burst-balloons",
        "Hard",
        "Reverse Interval DP",
        [
          "Google",
          "Amazon",
          "Microsoft"
        ],
        "Think in reverse: instead of which balloon bursts first, consider which balloon bursts LAST in range [i, j].",
        "Add 1s to both ends: nums = [1] + nums + [1]. dp[i][j] = max(dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j] for k in i+1..j-1).",
        "O(N^3)",
        "O(N^2)",
        "Forward thinking causes subproblems to depend on outer balloons; reverse thinking decouples left and right subproblems."
      ],
      [
        "Palindrome Partitioning II",
        132,
        "palindrome-partitioning-ii",
        "Hard",
        "Precomputed Palindromes + 1D DP",
        [
          "Amazon",
          "Google"
        ],
        "dp[i] = minimum cuts for s[:i+1]. For all j <= i where s[j:i+1] is palindrome: dp[i] = min(dp[i], dp[j-1] + 1).",
        "Expand around all centers to find palindromes. Update dp cuts array directly.",
        "O(N^2)",
        "O(N)",
        "Precomputing palindromes or expanding centers avoids O(N^3)."
      ],
      [
        "Maximal Rectangle",
        85,
        "maximal-rectangle",
        "Hard",
        "Histogram DP on 2D Matrix",
        [
          "Google",
          "Amazon",
          "Apple"
        ],
        "Each row represents the base of a histogram. Running count of consecutive 1s gives heights. Run Largest Rectangle in Histogram on each row.",
        "heights = [0] * cols. max_area = 0. For row in matrix: for c in range(cols): heights[c] = heights[c] + 1 if row[c] == '1' else 0; max_area = max(max_area, largestRectangleArea(heights)). Return max_area.",
        "O(R * C)",
        "O(C)",
        "Reset height to 0 when row[c] == '0'."
      ]
    ]
  },
  {
    "topic": "Bit Manipulation",
    "description": "Bitwise XOR, AND, OR, bit masks, two's complement, and bit-level arithmetic.",
    "icon": "binary",
    "problems": [
      [
        "Single Number",
        136,
        "single-number",
        "Easy",
        "Bitwise XOR Cancellation",
        [
          "Amazon",
          "Google",
          "Meta",
          "Apple"
        ],
        "x ^ x = 0 and x ^ 0 = x. XOR-ing all numbers cancels out pairs, leaving the single number.",
        "res = 0; for x in nums: res ^= x; return res.",
        "O(N)",
        "O(1)",
        "Only works when all other elements appear exactly twice."
      ],
      [
        "Number of 1 Bits",
        191,
        "number-of-1-bits",
        "Easy",
        "Brian Kernighan's Algorithm",
        [
          "Microsoft",
          "Amazon",
          "Apple"
        ],
        "n & (n - 1) flips the lowest set bit to 0. Count how many times this operation runs until n reaches 0.",
        "count = 0; while n: n &= (n - 1); count += 1; return count.",
        "O(Set Bits)",
        "O(1)",
        "Only loops through actual set bits rather than all 32 bits."
      ],
      [
        "Counting Bits",
        338,
        "counting-bits",
        "Easy",
        "DP Bit Recurrence",
        [
          "Amazon",
          "Google"
        ],
        "ans[i] = ans[i >> 1] + (i & 1). Number of bits in i equals bits in i // 2 plus last bit.",
        "ans = [0] * (n + 1). For i in 1..n: ans[i] = ans[i >> 1] + (i & 1). Return ans.",
        "O(N)",
        "O(N)",
        "Linear O(N) single pass without calling bit count function."
      ],
      [
        "Reverse Bits",
        190,
        "reverse-bits",
        "Easy",
        "Bit Shift Accumulation",
        [
          "Apple",
          "Amazon"
        ],
        "Extract LSB with n & 1, shift into result res = (res << 1) | (n & 1), right shift n.",
        "res = 0; for _ in range(32): res = (res << 1) | (n & 1); n >>= 1; return res.",
        "O(1)",
        "O(1)",
        "Must loop exactly 32 times to handle leading zeros correctly."
      ],
      [
        "Missing Number",
        268,
        "missing-number",
        "Easy",
        "Bitwise XOR",
        [
          "Amazon",
          "Microsoft"
        ],
        "XOR all numbers 0..n and all array values.",
        "res = n; for i, x in enumerate(nums): res ^= i ^ x; return res.",
        "O(N)",
        "O(1)",
        "Zero overflow risk compared to sum arithmetic."
      ],
      [
        "Sum of Two Integers",
        371,
        "sum-of-two-integers",
        "Medium",
        "Half-Adder Logic (XOR & AND)",
        [
          "Google",
          "Amazon"
        ],
        "XOR a ^ b computes sum without carry. AND (a & b) << 1 computes carry. Repeat until carry is 0.",
        "mask = 0xFFFFFFFF. While b & mask != 0: carry = (a & b) << 1; a = a ^ b; b = carry. Return a if a <= 0x7FFFFFFF else ~(a ^ mask).",
        "O(1)",
        "O(1)",
        "Python's arbitrary-precision integers require masking with 0xFFFFFFFF to simulate 32-bit overflow."
      ],
      [
        "Subsets",
        78,
        "subsets",
        "Medium",
        "Bitmask Representation",
        [
          "Meta",
          "Amazon"
        ],
        "Numbers 0 to 2^n - 1 represent all subsets. If j-th bit of i is set, include nums[j].",
        "res = []; for i in range(1 << n): res.append([nums[j] for j in range(n) if (i >> j) & 1]). Return res.",
        "O(2^N * N)",
        "O(N)",
        "Clean alternative to recursion."
      ],
      [
        "Maximum XOR of Two Numbers in an Array",
        421,
        "maximum-xor-of-two-numbers-in-an-array",
        "Medium",
        "Bitmask Prefix Set / Trie",
        [
          "Google"
        ],
        "Build max XOR bit by bit from MSB to LSB. Check if any two prefixes XOR to candidate.",
        "Binary Trie or prefix set.",
        "O(32 * N)",
        "O(N)",
        "Bit mask evaluation."
      ]
    ]
  },
  {
    "topic": "System & Data Structure Design",
    "description": "High-frequency interview design questions: LRU, LFU, O(1) structures, and autocomplete.",
    "icon": "tool",
    "problems": [
      [
        "LRU Cache",
        146,
        "lru-cache",
        "Medium",
        "Hash Map + Doubly Linked List",
        [
          "Amazon",
          "Google",
          "Meta",
          "Microsoft",
          "Apple",
          "Uber",
          "Bloomberg"
        ],
        "Hash map gives O(1) key-to-node lookup. Doubly linked list maintains LRU ordering with O(1) node removal and addition to head.",
        "get(key): if key not in map return -1; node = map[key]; move_to_head(node); return node.val. put(key, val): if key exists: update and move to head; else: create node, add to head, if size > cap: evict tail node and delete from map.",
        "O(1) all ops",
        "O(Capacity)",
        "Remember dummy head and dummy tail nodes simplify edge removals immensely."
      ],
      [
        "LFU Cache",
        460,
        "lfu-cache",
        "Hard",
        "Hash Map + Frequency DLLs",
        [
          "Amazon",
          "Google",
          "Microsoft"
        ],
        "Map key -> node. Map freq -> DoublyLinkedList of nodes. Maintain min_freq counter.",
        "When node accessed, increment its freq, move to new freq list. If old freq list empty and was min_freq, min_freq += 1. On eviction, remove tail from min_freq list.",
        "O(1) all ops",
        "O(Capacity)",
        "Ties in frequency are broken by LRU order (evict least recently used among least frequently used)."
      ],
      [
        "Insert Delete GetRandom O(1)",
        380,
        "insert-delete-getrandom-o1",
        "Medium",
        "Dynamic Array + Index Map",
        [
          "Meta",
          "Amazon",
          "Google",
          "Bloomberg"
        ],
        "Array provides O(1) random access via random.choice. Hash map stores val -> array index. To delete in O(1): swap target element with last element, pop from array, update map.",
        "insert(val): if val in map: return False; map[val] = len(nums); nums.append(val); return True. remove(val): if val not in map: return False; idx = map[val]; last = nums[-1]; nums[idx] = last; map[last] = idx; nums.pop(); del map[val]; return True.",
        "O(1) all ops",
        "O(N)",
        "Swapping with last element allows O(1) pop without shifting array."
      ],
      [
        "Time Based Key-Value Store",
        981,
        "time-based-key-value-store",
        "Medium",
        "Hash Map + Binary Search Array",
        [
          "Google",
          "Netflix",
          "Amazon"
        ],
        "Map key to array of (timestamp, value). Since timestamps are strictly increasing, use binary search for get.",
        "set(key, val, time): map[key].append((time, val)). get(key, time): binary search for rightmost entry with timestamp <= time.",
        "O(log N) get, O(1) set",
        "O(N)",
        "Return empty string '' if all timestamps for key are greater than requested time."
      ],
      [
        "Design Twitter",
        355,
        "design-twitter",
        "Medium",
        "Hash Map + Min/Max Heap Merge",
        [
          "Twitter",
          "Amazon"
        ],
        "Map user -> followees set. Map user -> list of (timestamp, tweetId). Feed merges most recent tweets across all followees using min/max heap.",
        "getNewsFeed(userId): collect recent 10 tweets from user and all followees. Merge using heap of size 10.",
        "O(K log K) feed",
        "O(Users + Tweets)",
        "User automatically sees their own tweets in news feed."
      ],
      [
        "Design Search Autocomplete System",
        642,
        "design-search-autocomplete-system",
        "Hard",
        "Trie + Min-Heap / Top-3 Cache",
        [
          "Google",
          "Amazon"
        ],
        "Trie node stores sentence frequencies or top-3 suggestions. Interactive character input updates search pointer.",
        "Each Trie node maintains top-3 hot sentences sorted by frequency descending then ASCII ascending. '#' ends input and updates frequency.",
        "O(P + 3 log 3)",
        "O(Total Sentences)",
        "Tiebreaker: identical frequencies sort by ASCII alphabetical order."
      ]
    ]
  }
];

const DSA_PROBLEMS_LIST = [
  {
    "id": 1,
    "title": "Two Sum",
    "lc": 1,
    "slug": "two-sum",
    "url": "https://leetcode.com/problems/two-sum/",
    "diff": "Easy",
    "topic": "Arrays",
    "pattern": "Hash Map Complement",
    "companies": [
      "Google",
      "Amazon",
      "Meta",
      "Apple",
      "Microsoft"
    ],
    "mental": "Knowing x determines needed complement = target - x. Check if seen before in O(1).",
    "algo": "Iterate nums. Compute complement = target - num. If complement in hash map return [map[complement], i], else map[num] = i.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Using the same element twice. Check map before inserting current index."
  },
  {
    "id": 2,
    "title": "Best Time to Buy and Sell Stock",
    "lc": 121,
    "slug": "best-time-to-buy-and-sell-stock",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "diff": "Easy",
    "topic": "Arrays",
    "pattern": "Prefix Minimum Greedy",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Apple",
      "Uber"
    ],
    "mental": "You can only sell in the future. Track the lowest buy price seen so far as you traverse.",
    "algo": "Track min_price and max_profit. For each price: min_price = min(min_price, price); max_profit = max(max_profit, price - min_price).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Do not look for global minimum first, as it could occur after the peak."
  },
  {
    "id": 3,
    "title": "Contains Duplicate",
    "lc": 217,
    "slug": "contains-duplicate",
    "url": "https://leetcode.com/problems/contains-duplicate/",
    "diff": "Easy",
    "topic": "Arrays",
    "pattern": "Hash Set Membership",
    "companies": [
      "Apple",
      "Amazon",
      "Microsoft"
    ],
    "mental": "Sets enforce uniqueness. If adding fails or item is in set, duplicate exists.",
    "algo": "seen = set(). For x in nums: if x in seen return True, else seen.add(x). Return False.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Sorting takes O(N log N); HashSet achieves linear O(N)."
  },
  {
    "id": 4,
    "title": "Product of Array Except Self",
    "lc": 238,
    "slug": "product-of-array-except-self",
    "url": "https://leetcode.com/problems/product-of-array-except-self/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Prefix & Suffix Products",
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft",
      "Apple",
      "Google"
    ],
    "mental": "res[i] = (product of elements before i) * (product of elements after i). Compute without division in two passes.",
    "algo": "First pass: fill res with prefix products left-to-right. Second pass: sweep right-to-left with running suffix product accumulator.",
    "tc": "O(N)",
    "sc": "O(1) aux",
    "trap": "Division by zero when array contains 0s. Problem forbids division."
  },
  {
    "id": 5,
    "title": "Maximum Subarray",
    "lc": 53,
    "slug": "maximum-subarray",
    "url": "https://leetcode.com/problems/maximum-subarray/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Kadane's Algorithm",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google",
      "Apple",
      "LinkedIn"
    ],
    "mental": "A negative running prefix sum only degrades any future subarray. Discard it immediately.",
    "algo": "cur_sum = 0, max_sum = nums[0]. For x in nums: cur_sum = max(x, cur_sum + x); max_sum = max(max_sum, cur_sum).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "When all numbers are negative, initializing max_sum to 0 gives incorrect 0 instead of max negative."
  },
  {
    "id": 6,
    "title": "Maximum Product Subarray",
    "lc": 152,
    "slug": "maximum-product-subarray",
    "url": "https://leetcode.com/problems/maximum-product-subarray/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Min/Max Dynamic State",
    "companies": [
      "Google",
      "Amazon",
      "LinkedIn",
      "Microsoft"
    ],
    "mental": "Multiplying by a negative number flips minimum into maximum. Maintain both min and max running products.",
    "algo": "If num < 0, swap cur_max and cur_min. cur_max = max(x, cur_max*x), cur_min = min(x, cur_min*x). Update global max.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Zeros reset the running product; handled cleanly by comparing with current element x."
  },
  {
    "id": 7,
    "title": "Find Minimum in Rotated Sorted Array",
    "lc": 153,
    "slug": "find-minimum-in-rotated-sorted-array",
    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Binary Search",
    "companies": [
      "Meta",
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "Compare mid with right. If nums[mid] > nums[right], inflection point is in right half.",
    "algo": "l = 0, r = len(nums)-1. While l < r: mid = (l+r)//2. If nums[mid] > nums[r]: l = mid + 1; else: r = mid. Return nums[l].",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Comparing mid with left is ambiguous when array isn't rotated. Always compare with right."
  },
  {
    "id": 8,
    "title": "Search in Rotated Sorted Array",
    "lc": 33,
    "slug": "search-in-rotated-sorted-array",
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Binary Search on Sorted Half",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft",
      "Apple",
      "Uber"
    ],
    "mental": "At least one half is always strictly sorted. Identify which half is sorted, check if target falls in it.",
    "algo": "If nums[l] <= nums[mid], left half is sorted. Check if nums[l] <= target < nums[mid]; adjust pointers accordingly.",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Strict vs non-strict inequality on boundary checks."
  },
  {
    "id": 9,
    "title": "3Sum",
    "lc": 15,
    "slug": "3sum",
    "url": "https://leetcode.com/problems/3sum/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Sort + Two Pointers",
    "companies": [
      "Meta",
      "Amazon",
      "Apple",
      "Google",
      "Microsoft",
      "Uber"
    ],
    "mental": "Sort array. Fix nums[i], then use two pointers on right subarray to find pair summing to -nums[i].",
    "algo": "Sort nums. For i in 0..N-3: skip duplicates (nums[i] == nums[i-1]). l = i+1, r = N-1. If sum == 0: record triplet, advance both pointers while skipping duplicates.",
    "tc": "O(N^2)",
    "sc": "O(1) aux",
    "trap": "Duplicate triplets. Must advance pointers past equal values for i, l, and r."
  },
  {
    "id": 10,
    "title": "Container With Most Water",
    "lc": 11,
    "slug": "container-with-most-water",
    "url": "https://leetcode.com/problems/container-with-most-water/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Greedy Two Pointers",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Adobe",
      "Apple"
    ],
    "mental": "Area is constrained by shorter wall. Moving taller wall inward can only decrease area. Move shorter wall.",
    "algo": "l = 0, r = N-1. While l < r: update max_area with (r - l) * min(h[l], h[r]). Increment l if h[l] < h[r] else decrement r.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Moving taller pointer is guaranteed sub-optimal."
  },
  {
    "id": 11,
    "title": "Majority Element",
    "lc": 169,
    "slug": "majority-element",
    "url": "https://leetcode.com/problems/majority-element/",
    "diff": "Easy",
    "topic": "Arrays",
    "pattern": "Boyer-Moore Voting",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Apple"
    ],
    "mental": "Majority element occurs > N/2 times. Cancel out differing elements; majority element always survives.",
    "algo": "count = 0, candidate = None. For x in nums: if count == 0 candidate = x; count += (1 if x == candidate else -1).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Assumes majority element guaranteed. If not, second verification pass required."
  },
  {
    "id": 12,
    "title": "Missing Number",
    "lc": 268,
    "slug": "missing-number",
    "url": "https://leetcode.com/problems/missing-number/",
    "diff": "Easy",
    "topic": "Arrays",
    "pattern": "Gauss Math / Bitwise XOR",
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "mental": "Expected sum of 0..n is n*(n+1)/2. Missing number is expected - actual. XOR indices and values to avoid overflow.",
    "algo": "n = len(nums); return n * (n + 1) // 2 - sum(nums).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Integer overflow in 32-bit languages when n is huge. Bitwise XOR avoids overflow."
  },
  {
    "id": 13,
    "title": "Find All Numbers Disappeared in an Array",
    "lc": 448,
    "slug": "find-all-numbers-disappeared-in-an-array",
    "url": "https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/",
    "diff": "Easy",
    "topic": "Arrays",
    "pattern": "In-Place Index Negation",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Values 1..n map to indices 0..n-1. Negate the number at index abs(val) - 1 to mark presence.",
    "algo": "For x in nums: idx = abs(x) - 1; if nums[idx] > 0: nums[idx] = -nums[idx]. Second pass: collect i + 1 where nums[i] > 0.",
    "tc": "O(N)",
    "sc": "O(1) aux",
    "trap": "Must use abs(x) because value at x may have been negated by an earlier visit."
  },
  {
    "id": 14,
    "title": "Merge Sorted Array",
    "lc": 88,
    "slug": "merge-sorted-array",
    "url": "https://leetcode.com/problems/merge-sorted-array/",
    "diff": "Easy",
    "topic": "Arrays",
    "pattern": "Reverse Three Pointers",
    "companies": [
      "Meta",
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "mental": "nums1 has free space at the end. Merge from index m + n - 1 backwards to avoid overwriting.",
    "algo": "p1 = m - 1, p2 = n - 1, p = m + n - 1. While p2 >= 0: if p1 >= 0 and nums1[p1] > nums2[p2]: nums1[p] = nums1[p1]; p1 -= 1; else: nums1[p] = nums2[p2]; p2 -= 1; p -= 1.",
    "tc": "O(M + N)",
    "sc": "O(1)",
    "trap": "Only loop while p2 >= 0; remaining nums1 elements are already in sorted place."
  },
  {
    "id": 15,
    "title": "Rotate Array",
    "lc": 189,
    "slug": "rotate-array",
    "url": "https://leetcode.com/problems/rotate-array/",
    "diff": "Medium",
    "topic": "Arrays",
    "pattern": "Three-Pass Array Reversal",
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "mental": "Reversing the whole array, then first k, then remaining n-k moves the last k elements to front.",
    "algo": "k %= len(nums). reverse(nums, 0, n-1); reverse(nums, 0, k-1); reverse(nums, k, n-1).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "k >= n; always take k %= len(nums)."
  },
  {
    "id": 16,
    "title": "Valid Anagram",
    "lc": 242,
    "slug": "valid-anagram",
    "url": "https://leetcode.com/problems/valid-anagram/",
    "diff": "Easy",
    "topic": "Strings",
    "pattern": "Frequency Array",
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google"
    ],
    "mental": "Anagrams must have identical character counts. Use a 26-int frequency buffer.",
    "algo": "If len(s) != len(t) return False. Increment for chars in s, decrement for t. Verify all zeroes.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Unicode strings require HashMap instead of fixed 26 array."
  },
  {
    "id": 17,
    "title": "Valid Palindrome",
    "lc": 125,
    "slug": "valid-palindrome",
    "url": "https://leetcode.com/problems/valid-palindrome/",
    "diff": "Easy",
    "topic": "Strings",
    "pattern": "Two Pointers with Filtering",
    "companies": [
      "Meta",
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "mental": "Scan from both ends inward, ignoring non-alphanumeric chars and case.",
    "algo": "l = 0, r = len(s)-1. Advance l past non-alphanumeric, retreat r past non-alphanumeric. Compare lowercase. Advance.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Inner skipping loops must check l < r to avoid index errors."
  },
  {
    "id": 18,
    "title": "Longest Common Prefix",
    "lc": 14,
    "slug": "longest-common-prefix",
    "url": "https://leetcode.com/problems/longest-common-prefix/",
    "diff": "Easy",
    "topic": "Strings",
    "pattern": "Vertical Scanning",
    "companies": [
      "Amazon",
      "Apple",
      "Google"
    ],
    "mental": "Compare characters column by column across all strings. Stop at first mismatch.",
    "algo": "Use strs[0] as pivot. For col in 0..len(strs[0])-1: check if all strings have same char at col. If not, slice strs[0][:col].",
    "tc": "O(S)",
    "sc": "O(1)",
    "trap": "Empty array strs = [] or single-string inputs."
  },
  {
    "id": 19,
    "title": "Longest Substring Without Repeating Characters",
    "lc": 3,
    "slug": "longest-substring-without-repeating-characters",
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "diff": "Medium",
    "topic": "Strings",
    "pattern": "Sliding Window + Last Seen Map",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft",
      "Bloomberg",
      "Apple"
    ],
    "mental": "Window [l..r]. If s[r] seen at idx >= l, jump l to idx + 1 to eliminate the duplicate.",
    "algo": "seen = {}; l = 0, max_len = 0. For r, c in enumerate(s): if c in seen and seen[c] >= l: l = seen[c] + 1; seen[c] = r; max_len = max(max_len, r - l + 1).",
    "tc": "O(N)",
    "sc": "O(min(N, Alphabet))",
    "trap": "Must check seen[c] >= l; otherwise left pointer could jump backward."
  },
  {
    "id": 20,
    "title": "Longest Repeating Character Replacement",
    "lc": 424,
    "slug": "longest-repeating-character-replacement",
    "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "diff": "Medium",
    "topic": "Strings",
    "pattern": "Sliding Window Max Frequency",
    "companies": [
      "Google",
      "Amazon",
      "Uber"
    ],
    "mental": "Window is valid if (window_size - max_frequency) <= k. Otherwise shrink from left.",
    "algo": "counts = defaultdict(int); max_f = 0, l = 0, res = 0. Expand r: update counts and max_f. While (r - l + 1) - max_f > k: decrement counts[s[l]], l += 1. res = max(res, r - l + 1).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "max_f does not need decrementing when shrinking; a non-decreasing max_f finds global maximum."
  },
  {
    "id": 21,
    "title": "Group Anagrams",
    "lc": 49,
    "slug": "group-anagrams",
    "url": "https://leetcode.com/problems/group-anagrams/",
    "diff": "Medium",
    "topic": "Strings",
    "pattern": "Canonical Tuple Hash Key",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Apple",
      "Microsoft"
    ],
    "mental": "All anagrams sort to identical string or share 26-element character count tuple.",
    "algo": "groups = defaultdict(list). For s in strs: key = tuple(sorted(s)); groups[key].append(s). Return list(groups.values()).",
    "tc": "O(N * K log K)",
    "sc": "O(N * K)",
    "trap": "Using mutable list as map key in Python; must convert to tuple or string."
  },
  {
    "id": 22,
    "title": "Valid Parentheses",
    "lc": 20,
    "slug": "valid-parentheses",
    "url": "https://leetcode.com/problems/valid-parentheses/",
    "diff": "Easy",
    "topic": "Strings",
    "pattern": "LIFO Stack Matching",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft",
      "LinkedIn"
    ],
    "mental": "Most recently opened bracket must be first closed. Push openers, pop and verify closures.",
    "algo": "stack = []; pairs = {')': '(', '}': '{', ']': '['}. If char in pairs: if not stack or stack.pop() != pairs[char]: return False; else stack.append(char). Return not stack.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Empty stack on pop, or leftover open brackets at end."
  },
  {
    "id": 23,
    "title": "Minimum Window Substring",
    "lc": 76,
    "slug": "minimum-window-substring",
    "url": "https://leetcode.com/problems/minimum-window-substring/",
    "diff": "Hard",
    "topic": "Strings",
    "pattern": "Sliding Window Two HashMaps",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Uber",
      "Airbnb"
    ],
    "mental": "Expand right until all chars of t are matched. Then shrink left to find minimal valid window.",
    "algo": "Maintain target counts and current window counts. Track 'formed' unique matches. When formed == required, record min length, shrink left, update formed, l++.",
    "tc": "O(N + M)",
    "sc": "O(Alphabet)",
    "trap": "Comparing total char count instead of unique char count matching threshold."
  },
  {
    "id": 24,
    "title": "Permutation in String",
    "lc": 567,
    "slug": "permutation-in-string",
    "url": "https://leetcode.com/problems/permutation-in-string/",
    "diff": "Medium",
    "topic": "Strings",
    "pattern": "Fixed Size Sliding Window",
    "companies": [
      "Microsoft",
      "Meta",
      "Amazon"
    ],
    "mental": "Permutation of s1 in s2 means a contiguous window of length len(s1) has matching char counts.",
    "algo": "Initialize 26-int count arrays for s1 and first window of s2. Slide window across s2 adding right and dropping left char in O(1).",
    "tc": "O(len(s2))",
    "sc": "O(1)",
    "trap": "If len(s1) > len(s2), return False immediately."
  },
  {
    "id": 25,
    "title": "String to Integer (atoi)",
    "lc": 8,
    "slug": "string-to-integer-atoi",
    "url": "https://leetcode.com/problems/string-to-integer-atoi/",
    "diff": "Medium",
    "topic": "Strings",
    "pattern": "State Machine Parser",
    "companies": [
      "Microsoft",
      "Amazon",
      "Google"
    ],
    "mental": "Parse whitespace -> optional sign -> digits accumulation -> clamp to 32-bit signed range [-2^31, 2^31 - 1].",
    "algo": "Skip spaces. Check +/-. Iterate digits: val = val * 10 + digit. Clamp between INT_MIN and INT_MAX.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Overflow during multiplication in static typed languages."
  },
  {
    "id": 26,
    "title": "Longest Palindromic Substring",
    "lc": 5,
    "slug": "longest-palindromic-substring",
    "url": "https://leetcode.com/problems/longest-palindromic-substring/",
    "diff": "Medium",
    "topic": "Strings",
    "pattern": "Expand Around Centers",
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft",
      "Google"
    ],
    "mental": "Palindromes expand outward from center. Test 2N - 1 centers (single char and two char centers).",
    "algo": "For i in 0..N-1: expand(i, i) and expand(i, i+1). Track longest range found.",
    "tc": "O(N^2)",
    "sc": "O(1)",
    "trap": "Even-length palindromes like 'abba' where center is between characters."
  },
  {
    "id": 27,
    "title": "Encode and Decode Strings",
    "lc": 271,
    "slug": "encode-and-decode-strings",
    "url": "https://leetcode.com/problems/encode-and-decode-strings/",
    "diff": "Medium",
    "topic": "Strings",
    "pattern": "Length-Prefix Framing",
    "companies": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "mental": "Delimiters can occur inside strings. Prefix each string with its length and a sentinel: '4#leet4#code'.",
    "algo": "Encode: join f'{len(s)}#{s}' for s in strs. Decode: read digits until '#', extract substring of that length, repeat.",
    "tc": "O(Total Chars)",
    "sc": "O(1) aux",
    "trap": "Strings containing '#' or numbers are handled unambiguously by length prefix."
  },
  {
    "id": 28,
    "title": "Two Sum",
    "lc": 1,
    "slug": "two-sum",
    "url": "https://leetcode.com/problems/two-sum/",
    "diff": "Easy",
    "topic": "Hashing",
    "pattern": "Hash Map Complement",
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "mental": "Lookup complement = target - num in O(1).",
    "algo": "Check if target - num in map. If so return indices; else map[num] = index.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Using same element twice."
  },
  {
    "id": 29,
    "title": "Contains Duplicate",
    "lc": 217,
    "slug": "contains-duplicate",
    "url": "https://leetcode.com/problems/contains-duplicate/",
    "diff": "Easy",
    "topic": "Hashing",
    "pattern": "Hash Set",
    "companies": [
      "Apple",
      "Microsoft"
    ],
    "mental": "Set stores seen values. Immediate return on collision.",
    "algo": "seen = set(); for x in nums: if x in seen: return True; seen.add(x).",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Space vs time trade-off."
  },
  {
    "id": 30,
    "title": "Group Anagrams",
    "lc": 49,
    "slug": "group-anagrams",
    "url": "https://leetcode.com/problems/group-anagrams/",
    "diff": "Medium",
    "topic": "Hashing",
    "pattern": "Canonical Hash Key",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Group words by sorted character string or 26-count tuple.",
    "algo": "map[tuple(sorted(word))].append(word). Return map values.",
    "tc": "O(N * K log K)",
    "sc": "O(N * K)",
    "trap": "List keys cannot be hashed in Python."
  },
  {
    "id": 31,
    "title": "Top K Frequent Elements",
    "lc": 347,
    "slug": "top-k-frequent-elements",
    "url": "https://leetcode.com/problems/top-k-frequent-elements/",
    "diff": "Medium",
    "topic": "Hashing",
    "pattern": "Bucket Sort / Min-Heap",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Count frequencies. Bucket sort by frequency (max freq is N) to achieve O(N) linear time without heap.",
    "algo": "counts = Counter(nums). buckets = [[] for _ in range(N+1)]. Place num in buckets[freq]. Collect from back until k elements.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Heap approach is O(N log K); Bucket Sort is pure O(N)."
  },
  {
    "id": 32,
    "title": "Longest Consecutive Sequence",
    "lc": 128,
    "slug": "longest-consecutive-sequence",
    "url": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "diff": "Medium",
    "topic": "Hashing",
    "pattern": "Hash Set Sequence Start",
    "companies": [
      "Google",
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "mental": "Only start counting sequence from numbers that are sequence starts (i.e. num - 1 not in set).",
    "algo": "num_set = set(nums). For x in num_set: if x - 1 not in num_set: count up x + 1, x + 2... Track max length.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Counting from every number yields O(N^2); only count from sequence start gives O(N)."
  },
  {
    "id": 33,
    "title": "Subarray Sum Equals K",
    "lc": 560,
    "slug": "subarray-sum-equals-k",
    "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "diff": "Medium",
    "topic": "Hashing",
    "pattern": "Prefix Sum + Hash Map",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "If prefix_sum[j] - prefix_sum[i] = k, then prefix_sum[i] = prefix_sum[j] - k. Count how many times this prefix occurred.",
    "algo": "prefix_counts = {0: 1}. cur_sum = 0, res = 0. For x in nums: cur_sum += x; res += prefix_counts.get(cur_sum - k, 0); prefix_counts[cur_sum] = prefix_counts.get(cur_sum, 0) + 1.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Must initialize prefix_counts with {0: 1} to account for subarrays starting at index 0."
  },
  {
    "id": 34,
    "title": "Isomorphic Strings",
    "lc": 205,
    "slug": "isomorphic-strings",
    "url": "https://leetcode.com/problems/isomorphic-strings/",
    "diff": "Easy",
    "topic": "Hashing",
    "pattern": "Bi-directional Character Mapping",
    "companies": [
      "Amazon",
      "Google",
      "LinkedIn"
    ],
    "mental": "Both s -> t and t -> s mappings must be strictly one-to-one and injective.",
    "algo": "Use two maps s_to_t and t_to_s. For c1, c2 in zip(s, t): if c1 in s_to_t and s_to_t[c1] != c2: return False. Same for t_to_s.",
    "tc": "O(N)",
    "sc": "O(Alphabet)",
    "trap": "Mapping 'ab' to 'aa' fails if you only check one direction."
  },
  {
    "id": 35,
    "title": "Happy Number",
    "lc": 202,
    "slug": "happy-number",
    "url": "https://leetcode.com/problems/happy-number/",
    "diff": "Easy",
    "topic": "Hashing",
    "pattern": "Floyd's Cycle Detection / Set",
    "companies": [
      "Amazon",
      "Google",
      "Uber"
    ],
    "mental": "Sum of squares of digits either reaches 1 or enters an infinite cycle (like 4 -> 16 -> 37 -> ...).",
    "algo": "seen = set(). While n != 1 and n not in seen: seen.add(n); n = sum(int(d)**2 for d in str(n)). Return n == 1.",
    "tc": "O(log N)",
    "sc": "O(log N)",
    "trap": "Infinite loops; cycle detection is essential."
  },
  {
    "id": 36,
    "title": "Four Sum II",
    "lc": 454,
    "slug": "4sum-ii",
    "url": "https://leetcode.com/problems/4sum-ii/",
    "diff": "Medium",
    "topic": "Hashing",
    "pattern": "Meet in the Middle Hash Map",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Divide 4 arrays into two pairs of 2. Compute all sums of A + B in O(N^2) hash map, then query with -(C + D).",
    "algo": "map_ab = Counter(a + b for a in A for b in B). Return sum(map_ab[-(c + d)] for c in C for d in D).",
    "tc": "O(N^2)",
    "sc": "O(N^2)",
    "trap": "Brute force O(N^4) will TLE; meet-in-the-middle reduces to O(N^2)."
  },
  {
    "id": 37,
    "title": "First Missing Positive",
    "lc": 41,
    "slug": "first-missing-positive",
    "url": "https://leetcode.com/problems/first-missing-positive/",
    "diff": "Hard",
    "topic": "Hashing",
    "pattern": "Cyclic In-Place Sort",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "mental": "Answer must be in 1..n+1. Place each number x at its ideal index x - 1 using swaps.",
    "algo": "While i < n: correct_idx = nums[i] - 1. If 1 <= nums[i] <= n and nums[i] != nums[correct_idx]: swap(nums[i], nums[correct_idx]). Else i += 1. Second pass: first i where nums[i] != i + 1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Infinite swap loops when nums[i] == nums[correct_idx]. Check for duplicate before swapping."
  },
  {
    "id": 38,
    "title": "Valid Palindrome",
    "lc": 125,
    "slug": "valid-palindrome",
    "url": "https://leetcode.com/problems/valid-palindrome/",
    "diff": "Easy",
    "topic": "Two Pointers",
    "pattern": "Converging Two Pointers",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "mental": "Pointers converge from ends toward center, comparing valid characters.",
    "algo": "l = 0, r = n - 1. Skip non-alphanumerics. Compare s[l].lower() == s[r].lower().",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Off-by-one errors when skipping."
  },
  {
    "id": 39,
    "title": "Two Sum II - Input Array Is Sorted",
    "lc": 167,
    "slug": "two-sum-ii-input-array-is-sorted",
    "url": "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
    "diff": "Medium",
    "topic": "Two Pointers",
    "pattern": "Sorted Two Pointers",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "mental": "Array is sorted. If sum < target, advance left to increase sum. If sum > target, retreat right.",
    "algo": "l = 0, r = n - 1. While l < r: s = nums[l] + nums[r]. If s == target return [l+1, r+1]; elif s < target: l += 1; else: r -= 1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "1-based index return requirement in problem specification."
  },
  {
    "id": 40,
    "title": "3Sum",
    "lc": 15,
    "slug": "3sum",
    "url": "https://leetcode.com/problems/3sum/",
    "diff": "Medium",
    "topic": "Two Pointers",
    "pattern": "Sort + Converging Pointers",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Fix one element, use Two Sum II on the remainder.",
    "algo": "Sort, iterate i. l = i+1, r = n-1. Skip duplicates.",
    "tc": "O(N^2)",
    "sc": "O(1) aux",
    "trap": "Duplicate triplets."
  },
  {
    "id": 41,
    "title": "Container With Most Water",
    "lc": 11,
    "slug": "container-with-most-water",
    "url": "https://leetcode.com/problems/container-with-most-water/",
    "diff": "Medium",
    "topic": "Two Pointers",
    "pattern": "Greedy Shrinking Pointers",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Always move the shorter boundary inward.",
    "algo": "l = 0, r = n-1. area = (r-l)*min(h[l], h[r]). Move shorter.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Moving taller boundary never increases area."
  },
  {
    "id": 42,
    "title": "Trapping Rain Water",
    "lc": 42,
    "slug": "trapping-rain-water",
    "url": "https://leetcode.com/problems/trapping-rain-water/",
    "diff": "Hard",
    "topic": "Two Pointers",
    "pattern": "Two Pointers Max Boundaries",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple",
      "Goldman Sachs"
    ],
    "mental": "Water trapped above index i depends on min(max_left, max_right) - height[i]. Advance whichever side has smaller max.",
    "algo": "l = 0, r = n-1, max_l = 0, max_r = 0, water = 0. While l < r: if height[l] < height[r]: if height[l] >= max_l: max_l = height[l]; else: water += max_l - height[l]; l += 1; else: if height[r] >= max_r: max_r = height[r]; else: water += max_r - height[r]; r -= 1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Confusing current height with running max height."
  },
  {
    "id": 43,
    "title": "Remove Duplicates from Sorted Array",
    "lc": 26,
    "slug": "remove-duplicates-from-sorted-array",
    "url": "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
    "diff": "Easy",
    "topic": "Two Pointers",
    "pattern": "Slow & Fast Pointers",
    "companies": [
      "Microsoft",
      "Amazon",
      "Apple"
    ],
    "mental": "Slow pointer tracks write position for unique elements. Fast pointer scans.",
    "algo": "write = 1. For fast in 1..n-1: if nums[fast] != nums[fast - 1]: nums[write] = nums[fast]; write += 1. Return write.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Empty array or 1-element array edge cases."
  },
  {
    "id": 44,
    "title": "Move Zeroes",
    "lc": 283,
    "slug": "move-zeroes",
    "url": "https://leetcode.com/problems/move-zeroes/",
    "diff": "Easy",
    "topic": "Two Pointers",
    "pattern": "Slow & Fast Partitioning",
    "companies": [
      "Meta",
      "Amazon",
      "Apple",
      "Google"
    ],
    "mental": "Maintain non-zero boundary. Swap non-zero elements with slow pointer position.",
    "algo": "slow = 0. For fast in 0..n-1: if nums[fast] != 0: nums[slow], nums[fast] = nums[fast], nums[slow]; slow += 1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Do not overwrite values before moving; swap preserves zero count."
  },
  {
    "id": 45,
    "title": "Squares of a Sorted Array",
    "lc": 977,
    "slug": "squares-of-a-sorted-array",
    "url": "https://leetcode.com/problems/squares-of-a-sorted-array/",
    "diff": "Easy",
    "topic": "Two Pointers",
    "pattern": "Two Pointers from Ends",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Largest squared values are at the extreme left (negative numbers) or extreme right (positive numbers).",
    "algo": "l = 0, r = n - 1, p = n - 1, res = [0]*n. While l <= r: if abs(nums[l]) > abs(nums[r]): res[p] = nums[l]**2; l += 1; else: res[p] = nums[r]**2; r -= 1; p -= 1.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Filling from index 0 upward requires sorting O(N log N); filling backwards is O(N)."
  },
  {
    "id": 46,
    "title": "Backspace String Compare",
    "lc": 844,
    "slug": "backspace-string-compare",
    "url": "https://leetcode.com/problems/backspace-string-compare/",
    "diff": "Easy",
    "topic": "Two Pointers",
    "pattern": "Reverse Two Pointers",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Backspaces '#' affect preceding characters. Scan backwards from end of strings.",
    "algo": "p1 = len(s)-1, p2 = len(t)-1, skip1 = 0, skip2 = 0. Scan backwards, count '#' to skip characters, compare next valid chars.",
    "tc": "O(N + M)",
    "sc": "O(1)",
    "trap": "Stack solution uses O(N) space; reverse pointers achieves O(1) space."
  },
  {
    "id": 47,
    "title": "Sort Colors",
    "lc": 75,
    "slug": "sort-colors",
    "url": "https://leetcode.com/problems/sort-colors/",
    "diff": "Medium",
    "topic": "Two Pointers",
    "pattern": "Dutch National Flag Partition",
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "mental": "Three-way partition array into [0s], [1s], [2s] in a single pass.",
    "algo": "low = 0, mid = 0, high = n - 1. While mid <= high: if nums[mid] == 0: swap(low, mid), low++, mid++; elif nums[mid] == 1: mid++; else: swap(mid, high), high--.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Do NOT increment mid when swapping with high, as swapped element from high must be inspected."
  },
  {
    "id": 48,
    "title": "Maximum Average Subarray I",
    "lc": 643,
    "slug": "maximum-average-subarray-i",
    "url": "https://leetcode.com/problems/maximum-average-subarray-i/",
    "diff": "Easy",
    "topic": "Sliding Window",
    "pattern": "Fixed Window Sum",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Window of fixed size k. Moving window forward adds nums[i] and subtracts nums[i - k].",
    "algo": "cur_sum = sum(nums[:k]), max_sum = cur_sum. For i in k..n-1: cur_sum += nums[i] - nums[i-k]; max_sum = max(max_sum, cur_sum). Return max_sum / k.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Recomputing sum from scratch inside loop makes it O(N*K) instead of O(N)."
  },
  {
    "id": 49,
    "title": "Longest Substring Without Repeating Characters",
    "lc": 3,
    "slug": "longest-substring-without-repeating-characters",
    "url": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "diff": "Medium",
    "topic": "Sliding Window",
    "pattern": "Dynamic Window",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Contract left pointer past last occurrence of duplicate char.",
    "algo": "Expand r, shrink l past duplicate. Track max(r - l + 1).",
    "tc": "O(N)",
    "sc": "O(min(N, Alphabet))",
    "trap": "Moving left pointer backward if index map is stale."
  },
  {
    "id": 50,
    "title": "Longest Repeating Character Replacement",
    "lc": 424,
    "slug": "longest-repeating-character-replacement",
    "url": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "diff": "Medium",
    "topic": "Sliding Window",
    "pattern": "Max Frequency Window",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Window valid if window_len - max_freq <= k.",
    "algo": "Expand r, update max_f. If window_len - max_f > k, shrink l.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Shrinking max_f is not required for optimal result."
  },
  {
    "id": 51,
    "title": "Permutation in String",
    "lc": 567,
    "slug": "permutation-in-string",
    "url": "https://leetcode.com/problems/permutation-in-string/",
    "diff": "Medium",
    "topic": "Sliding Window",
    "pattern": "Fixed Size Window",
    "companies": [
      "Microsoft",
      "Meta"
    ],
    "mental": "Window of fixed size len(s1) must match char counts.",
    "algo": "Slide window of size len(s1) across s2, tracking character matches.",
    "tc": "O(len(s2))",
    "sc": "O(1)",
    "trap": "s1 longer than s2 edge case."
  },
  {
    "id": 52,
    "title": "Minimum Window Substring",
    "lc": 76,
    "slug": "minimum-window-substring",
    "url": "https://leetcode.com/problems/minimum-window-substring/",
    "diff": "Hard",
    "topic": "Sliding Window",
    "pattern": "Dynamic Window Two Counts",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Expand until all chars present, contract until minimal.",
    "algo": "Track formed unique characters. Contract left while valid.",
    "tc": "O(N + M)",
    "sc": "O(Alphabet)",
    "trap": "Comparing frequencies directly vs unique satisfied characters."
  },
  {
    "id": 53,
    "title": "Sliding Window Maximum",
    "lc": 239,
    "slug": "sliding-window-maximum",
    "url": "https://leetcode.com/problems/sliding-window-maximum/",
    "diff": "Hard",
    "topic": "Sliding Window",
    "pattern": "Monotonic Deque",
    "companies": [
      "Google",
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "mental": "Deque stores indices of elements in decreasing order. Top of deque is always maximum of current window.",
    "algo": "q = deque(). For i in range(n): remove elements from back of q while nums[q[-1]] <= nums[i]. Push i. Remove front if q[0] <= i - k. If i >= k - 1: res.append(nums[q[0]]).",
    "tc": "O(N)",
    "sc": "O(K)",
    "trap": "Storing values in deque instead of indices prevents checking if element has left the window."
  },
  {
    "id": 54,
    "title": "Minimum Size Subarray Sum",
    "lc": 209,
    "slug": "minimum-size-subarray-sum",
    "url": "https://leetcode.com/problems/minimum-size-subarray-sum/",
    "diff": "Medium",
    "topic": "Sliding Window",
    "pattern": "Expanding/Shrinking Window",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "mental": "All numbers positive. Expand right until sum >= target, then shrink left to minimize window.",
    "algo": "l = 0, cur_sum = 0, min_len = inf. For r in 0..n-1: cur_sum += nums[r]; while cur_sum >= target: min_len = min(min_len, r - l + 1); cur_sum -= nums[l]; l += 1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "If no such subarray exists, return 0 (check min_len == inf)."
  },
  {
    "id": 55,
    "title": "Fruit Into Baskets",
    "lc": 904,
    "slug": "fruit-into-baskets",
    "url": "https://leetcode.com/problems/fruit-into-baskets/",
    "diff": "Medium",
    "topic": "Sliding Window",
    "pattern": "Longest Subarray with at most 2 Distinct",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Equivalent to finding longest contiguous subarray with at most 2 distinct elements.",
    "algo": "counts = defaultdict(int); l = 0, max_fruits = 0. Expand r: counts[tree[r]] += 1. While len(counts) > 2: counts[tree[l]] -= 1; if counts[tree[l]] == 0: del counts[tree[l]]; l += 1. max_fruits = max(max_fruits, r - l + 1).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Must delete key from dict when count hits 0 to maintain len(counts) <= 2."
  },
  {
    "id": 56,
    "title": "Max Consecutive Ones III",
    "lc": 1004,
    "slug": "max-consecutive-ones-iii",
    "url": "https://leetcode.com/problems/max-consecutive-ones-iii/",
    "diff": "Medium",
    "topic": "Sliding Window",
    "pattern": "Window with at most K Zeros",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Equivalent to finding longest subarray with at most k zeros.",
    "algo": "l = 0, zeros = 0, res = 0. For r in range(n): if nums[r] == 0: zeros += 1; while zeros > k: if nums[l] == 0: zeros -= 1; l += 1; res = max(res, r - l + 1).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Negative or 0 k values."
  },
  {
    "id": 57,
    "title": "Find All Anagrams in a String",
    "lc": 438,
    "slug": "find-all-anagrams-in-a-string",
    "url": "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
    "diff": "Medium",
    "topic": "Sliding Window",
    "pattern": "Fixed Window Anagram Search",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Slide window of size len(p) over s, tracking count of matching characters.",
    "algo": "Initialize counts for p and s[:len(p)]. Slide window: increment s[r], decrement s[l], check if counts match.",
    "tc": "O(len(s))",
    "sc": "O(1)",
    "trap": "len(s) < len(p) returns empty list immediately."
  },
  {
    "id": 58,
    "title": "Running Sum of 1D Array",
    "lc": 1480,
    "slug": "running-sum-of-1d-array",
    "url": "https://leetcode.com/problems/running-sum-of-1d-array/",
    "diff": "Easy",
    "topic": "Prefix Sum",
    "pattern": "Prefix Accumulator",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Each element becomes running sum of all elements up to that index.",
    "algo": "For i in 1..n-1: nums[i] += nums[i-1]. Return nums.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "In-place modification vs returning new array."
  },
  {
    "id": 59,
    "title": "Range Sum Query - Immutable",
    "lc": 303,
    "slug": "range-sum-query-immutable",
    "url": "https://leetcode.com/problems/range-sum-query-immutable/",
    "diff": "Easy",
    "topic": "Prefix Sum",
    "pattern": "Prefix Sum Precomputation",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "mental": "Range sum [l, r] = prefix[r + 1] - prefix[l] computed in O(1) time.",
    "algo": "Build prefix array of length n + 1 where prefix[i] = prefix[i-1] + nums[i-1]. Query: prefix[r+1] - prefix[l].",
    "tc": "O(1) query",
    "sc": "O(N)",
    "trap": "Off-by-one indexing on prefix array."
  },
  {
    "id": 60,
    "title": "Subarray Sum Equals K",
    "lc": 560,
    "slug": "subarray-sum-equals-k",
    "url": "https://leetcode.com/problems/subarray-sum-equals-k/",
    "diff": "Medium",
    "topic": "Prefix Sum",
    "pattern": "Prefix Sum + Hash Map",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "prefix[j] - prefix[i] = k -> count previous prefixes equal to current_prefix - k.",
    "algo": "counts = {0: 1}, cur = 0, res = 0. For x in nums: cur += x; res += counts.get(cur - k, 0); counts[cur] = counts.get(cur, 0) + 1.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Missing counts[0] = 1 handles subarrays starting at index 0."
  },
  {
    "id": 61,
    "title": "Contiguous Array",
    "lc": 525,
    "slug": "contiguous-array",
    "url": "https://leetcode.com/problems/contiguous-array/",
    "diff": "Medium",
    "topic": "Prefix Sum",
    "pattern": "Prefix Sum with +1 and -1",
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "mental": "Equal number of 0s and 1s. Treat 0 as -1 and 1 as +1. Problem becomes finding longest subarray with sum 0.",
    "algo": "first_seen = {0: -1}. cur = 0, max_len = 0. For i, x in enumerate(nums): cur += (1 if x == 1 else -1); if cur in first_seen: max_len = max(max_len, i - first_seen[cur]); else: first_seen[cur] = i.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Do not overwrite first_seen[cur] when cur repeats; earliest index maximizes length."
  },
  {
    "id": 62,
    "title": "Product of Array Except Self",
    "lc": 238,
    "slug": "product-of-array-except-self",
    "url": "https://leetcode.com/problems/product-of-array-except-self/",
    "diff": "Medium",
    "topic": "Prefix Sum",
    "pattern": "Prefix & Suffix Products",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Prefix product from left, suffix product from right.",
    "algo": "prefix[i] * suffix[i] gives product excluding index i.",
    "tc": "O(N)",
    "sc": "O(1) aux",
    "trap": "Division forbidden by prompt."
  },
  {
    "id": 63,
    "title": "Find Pivot Index",
    "lc": 724,
    "slug": "find-pivot-index",
    "url": "https://leetcode.com/problems/find-pivot-index/",
    "diff": "Easy",
    "topic": "Prefix Sum",
    "pattern": "Left Sum vs Right Sum",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Pivot index has sum(left) == sum(right). total_sum - left_sum - nums[i] equals right_sum.",
    "algo": "total = sum(nums), left = 0. For i, x in enumerate(nums): if left == total - left - x: return i; left += x. Return -1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Return leftmost pivot if multiple exist."
  },
  {
    "id": 64,
    "title": "Corporate Flight Bookings",
    "lc": 1109,
    "slug": "corporate-flight-bookings",
    "url": "https://leetcode.com/problems/corporate-flight-bookings/",
    "diff": "Medium",
    "topic": "Prefix Sum",
    "pattern": "Difference Array / Sweep Line",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Range update [first, last] with seats. Add +seats at first - 1, add -seats at last.",
    "algo": "diff = [0] * (n + 1). For first, last, seats in bookings: diff[first-1] += seats; diff[last] -= seats. Prefix sum diff to get final seats.",
    "tc": "O(N + B)",
    "sc": "O(N)",
    "trap": "1-based indexing in input converted to 0-based."
  },
  {
    "id": 65,
    "title": "Subarray Sums Divisible by K",
    "lc": 974,
    "slug": "subarray-sums-divisible-by-k",
    "url": "https://leetcode.com/problems/subarray-sums-divisible-by-k/",
    "diff": "Medium",
    "topic": "Prefix Sum",
    "pattern": "Prefix Sum Modulo K",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "If (prefix[j] - prefix[i]) % k == 0, then prefix[j] % k == prefix[i] % k.",
    "algo": "counts = {0: 1}. cur = 0, res = 0. For x in nums: cur = (cur + x) % k; res += counts.get(cur, 0); counts[cur] = counts.get(cur, 0) + 1.",
    "tc": "O(N)",
    "sc": "O(K)",
    "trap": "Negative numbers in Python vs other languages (Python % k is always positive; in C++/Java normalize (rem + k) % k)."
  },
  {
    "id": 66,
    "title": "Binary Search",
    "lc": 704,
    "slug": "binary-search",
    "url": "https://leetcode.com/problems/binary-search/",
    "diff": "Easy",
    "topic": "Binary Search",
    "pattern": "Classic Divide & Conquer",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "mental": "Compare mid with target. Halve search space every iteration.",
    "algo": "l = 0, r = n - 1. While l <= r: mid = l + (r - l)//2. If nums[mid] == target return mid; elif nums[mid] < target: l = mid + 1; else: r = mid - 1. Return -1.",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Integer overflow with (l + r)//2 in C++/Java. Use l + (r - l)//2."
  },
  {
    "id": 67,
    "title": "Search Insert Position",
    "lc": 35,
    "slug": "search-insert-position",
    "url": "https://leetcode.com/problems/search-insert-position/",
    "diff": "Easy",
    "topic": "Binary Search",
    "pattern": "Lower Bound Binary Search",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "mental": "If target found, return index. If not found, left pointer points to insertion position.",
    "algo": "l = 0, r = n - 1. While l <= r: mid = (l + r)//2. If nums[mid] < target: l = mid + 1; else: r = mid - 1. Return l.",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Returning l vs r. When loop terminates, l is insertion point."
  },
  {
    "id": 68,
    "title": "First Bad Version",
    "lc": 278,
    "slug": "first-bad-version",
    "url": "https://leetcode.com/problems/first-bad-version/",
    "diff": "Easy",
    "topic": "Binary Search",
    "pattern": "First True Binary Search",
    "companies": [
      "Google",
      "Meta"
    ],
    "mental": "Versions are [false, false, ..., true, true]. Find boundary where isBadVersion(mid) becomes true.",
    "algo": "l = 1, r = n. While l < r: mid = l + (r - l)//2. If isBadVersion(mid): r = mid; else: l = mid + 1. Return l.",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "r = mid vs r = mid - 1. When mid is bad, it could be first bad version."
  },
  {
    "id": 69,
    "title": "Search in Rotated Sorted Array",
    "lc": 33,
    "slug": "search-in-rotated-sorted-array",
    "url": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Rotated Array Binary Search",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Determine which half is sorted, check if target falls in it.",
    "algo": "Check nums[l] <= nums[mid]. Search sorted half or opposite.",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Boundary <= conditions."
  },
  {
    "id": 70,
    "title": "Find Minimum in Rotated Sorted Array",
    "lc": 153,
    "slug": "find-minimum-in-rotated-sorted-array",
    "url": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Inflection Point Search",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "mental": "Compare mid with right. Inflection point in right half if mid > right.",
    "algo": "While l < r: mid = (l + r)//2. If nums[mid] > nums[r]: l = mid + 1; else: r = mid. Return nums[l].",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Comparing with left can fail on non-rotated array."
  },
  {
    "id": 71,
    "title": "Search a 2D Matrix",
    "lc": 74,
    "slug": "search-a-2d-matrix",
    "url": "https://leetcode.com/problems/search-a-2d-matrix/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Virtual Flattened 1D Array",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "Matrix of m x n sorted elements is a virtual 1D array of length m*n. mid corresponds to matrix[mid // n][mid % n].",
    "algo": "l = 0, r = m * n - 1. While l <= r: mid = (l + r)//2; val = matrix[mid // n][mid % n]. If val == target return True; elif val < target: l = mid + 1; else: r = mid - 1. Return False.",
    "tc": "O(log(M * N))",
    "sc": "O(1)",
    "trap": "Row / col mapping formulas (mid // n, mid % n)."
  },
  {
    "id": 72,
    "title": "Koko Eating Bananas",
    "lc": 875,
    "slug": "koko-eating-bananas",
    "url": "https://leetcode.com/problems/koko-eating-bananas/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Binary Search on Answer Range",
    "companies": [
      "Google",
      "Amazon",
      "Airbnb"
    ],
    "mental": "Speed k lies in [1, max(piles)]. Can Koko eat all bananas in h hours at speed k? Monotonic function.",
    "algo": "l = 1, r = max(piles). While l < r: mid = (l + r)//2; hours = sum(ceil(p / mid) for p in piles). If hours <= h: r = mid; else: l = mid + 1. Return l.",
    "tc": "O(N log(max(piles)))",
    "sc": "O(1)",
    "trap": "Integer ceiling division: (p + mid - 1) // mid."
  },
  {
    "id": 73,
    "title": "Capacity to Ship Packages Within D Days",
    "lc": 1011,
    "slug": "capacity-to-ship-packages-within-d-days",
    "url": "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Binary Search on Capacity Answer",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Capacity lies in [max(weights), sum(weights)]. Check if a given capacity can ship within days.",
    "algo": "l = max(weights), r = sum(weights). While l < r: mid = (l + r)//2. If can_ship(mid, days): r = mid; else: l = mid + 1. Return l.",
    "tc": "O(N log(sum - max))",
    "sc": "O(1)",
    "trap": "Lower bound must be max(weights) because a ship must carry the heaviest single package."
  },
  {
    "id": 74,
    "title": "Find Peak Element",
    "lc": 162,
    "slug": "find-peak-element",
    "url": "https://leetcode.com/problems/find-peak-element/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Binary Search on Gradient",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "If nums[mid] < nums[mid + 1], you are on an uphill slope. A peak is guaranteed to exist on the right.",
    "algo": "l = 0, r = n - 1. While l < r: mid = (l + r)//2. If nums[mid] < nums[mid + 1]: l = mid + 1; else: r = mid. Return l.",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Array elements are strictly different adjacent nums[i] != nums[i+1]."
  },
  {
    "id": 75,
    "title": "Time Based Key-Value Store",
    "lc": 981,
    "slug": "time-based-key-value-store",
    "url": "https://leetcode.com/problems/time-based-key-value-store/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Hash Map + Binary Search Timestamp",
    "companies": [
      "Google",
      "Netflix",
      "Amazon"
    ],
    "mental": "Store list of (timestamp, value) pairs for each key. Timestamps are strictly increasing; use binary search.",
    "algo": "get(key, timestamp): binary search on key's list for largest timestamp <= query_timestamp.",
    "tc": "O(log N) get, O(1) set",
    "sc": "O(N)",
    "trap": "Query timestamp smaller than any stored timestamp returns empty string."
  },
  {
    "id": 76,
    "title": "Median of Two Sorted Arrays",
    "lc": 4,
    "slug": "median-of-two-sorted-arrays",
    "url": "https://leetcode.com/problems/median-of-two-sorted-arrays/",
    "diff": "Hard",
    "topic": "Binary Search",
    "pattern": "Binary Search on Partition Cut",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft",
      "Meta",
      "Apple"
    ],
    "mental": "Partition both arrays such that left halves have same total elements as right halves, and max(left) <= min(right).",
    "algo": "Binary search cut on shorter array A. cutB = (m + n + 1)//2 - cutA. Check if maxLeftA <= minRightB and maxLeftB <= minRightA. If so, compute median from border elements.",
    "tc": "O(log(min(M, N)))",
    "sc": "O(1)",
    "trap": "Always binary search on the shorter array to ensure O(log(min(M, N))) and valid index bounds."
  },
  {
    "id": 77,
    "title": "Split Array Largest Sum",
    "lc": 410,
    "slug": "split-array-largest-sum",
    "url": "https://leetcode.com/problems/split-array-largest-sum/",
    "diff": "Hard",
    "topic": "Binary Search",
    "pattern": "Binary Search on Max Subarray Sum",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Binary search on the largest subarray sum value in range [max(nums), sum(nums)].",
    "algo": "Check if array can be split into <= k subarrays with sum <= mid. Adjust bounds.",
    "tc": "O(N log(sum))",
    "sc": "O(1)",
    "trap": "Similar to Ship Packages problem."
  },
  {
    "id": 78,
    "title": "Find First and Last Position of Element in Sorted Array",
    "lc": 34,
    "slug": "find-first-and-last-position-of-element-in-sorted-array",
    "url": "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Double Binary Search Boundaries",
    "companies": [
      "Meta",
      "Amazon",
      "LinkedIn"
    ],
    "mental": "Two binary searches: one searches for leftmost index (r = mid - 1 on match), one searches for rightmost (l = mid + 1 on match).",
    "algo": "find_bound(is_first): if nums[mid] == target: save res; if is_first: r = mid - 1; else: l = mid + 1.",
    "tc": "O(log N)",
    "sc": "O(1)",
    "trap": "Linear scan after finding match takes O(N) when all elements are duplicates. Must use binary search for both."
  },
  {
    "id": 79,
    "title": "Minimum Number of Days to Make m Bouquets",
    "lc": 1482,
    "slug": "minimum-number-of-days-to-make-m-bouquets",
    "url": "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Binary Search on Bloom Days",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Search space of days [1, max(bloomDay)]. Check if m contiguous bouquets of k flowers can be picked.",
    "algo": "l = 1, r = max(bloomDay). While l < r: mid = (l + r)//2. If count_bouquets(mid) >= m: r = mid; else: l = mid + 1. Return l.",
    "tc": "O(N log(max_day))",
    "sc": "O(1)",
    "trap": "If m * k > len(bloomDay), return -1 immediately."
  },
  {
    "id": 80,
    "title": "Magnetic Force Between Two Balls",
    "lc": 1552,
    "slug": "magnetic-force-between-two-balls",
    "url": "https://leetcode.com/problems/magnetic-force-between-two-balls/",
    "diff": "Medium",
    "topic": "Binary Search",
    "pattern": "Aggressive Cows / Binary Search Distance",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Search space is minimum distance between balls [1, position[-1] - position[0]]. Check if m balls can be placed with >= mid distance.",
    "algo": "Sort position. l = 1, r = position[-1] - position[0]. While l <= r: mid = (l + r)//2. If can_place(mid, m): ans = mid; l = mid + 1; else: r = mid - 1. Return ans.",
    "tc": "O(N log(range))",
    "sc": "O(1)",
    "trap": "Greedy placement: always place first ball at position[0]."
  },
  {
    "id": 81,
    "title": "Reverse Linked List",
    "lc": 206,
    "slug": "reverse-linked-list",
    "url": "https://leetcode.com/problems/reverse-linked-list/",
    "diff": "Easy",
    "topic": "Linked List",
    "pattern": "Three Pointer Reversal",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta",
      "Apple"
    ],
    "mental": "For each node, point its next pointer to the previous node. Track prev, curr, next.",
    "algo": "prev = None, curr = head. While curr: nxt = curr.next; curr.next = prev; prev = curr; curr = nxt. Return prev.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Losing reference to curr.next before rewiring pointer."
  },
  {
    "id": 82,
    "title": "Merge Two Sorted Lists",
    "lc": 21,
    "slug": "merge-two-sorted-lists",
    "url": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "diff": "Easy",
    "topic": "Linked List",
    "pattern": "Dummy Head Two Pointers",
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple",
      "Google"
    ],
    "mental": "Create dummy head. Attach smaller node of l1 and l2, then advance that list pointer.",
    "algo": "dummy = ListNode(0); tail = dummy. While l1 and l2: if l1.val < l2.val: tail.next = l1; l1 = l1.next; else: tail.next = l2; l2 = l2.next; tail = tail.next. tail.next = l1 or l2. Return dummy.next.",
    "tc": "O(N + M)",
    "sc": "O(1)",
    "trap": "Remember to attach remaining non-empty list tail at end."
  },
  {
    "id": 83,
    "title": "Linked List Cycle",
    "lc": 141,
    "slug": "linked-list-cycle",
    "url": "https://leetcode.com/problems/linked-list-cycle/",
    "diff": "Easy",
    "topic": "Linked List",
    "pattern": "Floyd's Fast & Slow Pointers",
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "mental": "Fast moves 2 steps, slow moves 1 step. If a cycle exists, fast will inevitably catch slow.",
    "algo": "slow = fast = head. While fast and fast.next: slow = slow.next; fast = fast.next.next; if slow == fast: return True. Return False.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Checking fast.next is null before fast.next.next."
  },
  {
    "id": 84,
    "title": "Linked List Cycle II",
    "lc": 142,
    "slug": "linked-list-cycle-ii",
    "url": "https://leetcode.com/problems/linked-list-cycle-ii/",
    "diff": "Medium",
    "topic": "Linked List",
    "pattern": "Floyd's Cycle Entry Detection",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "When slow and fast meet, reset slow to head. Advance both 1 step at a time; they will meet at the cycle entry node.",
    "algo": "Find intersection. slow = head. While slow != fast: slow = slow.next; fast = fast.next. Return slow.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Mathematical proof: distance from head to entry equals distance from meeting point to entry."
  },
  {
    "id": 85,
    "title": "Remove Nth Node From End of List",
    "lc": 19,
    "slug": "remove-nth-node-from-end-of-list",
    "url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "diff": "Medium",
    "topic": "Linked List",
    "pattern": "Two Pointers N Steps Ahead",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Advance fast pointer n steps ahead. Then advance slow and fast together until fast reaches end.",
    "algo": "dummy = ListNode(0, head); fast = slow = dummy. Advance fast n+1 times. While fast: fast = fast.next; slow = slow.next. slow.next = slow.next.next. Return dummy.next.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Removing head node edge case cleanly handled by dummy node."
  },
  {
    "id": 86,
    "title": "Reorder List",
    "lc": 143,
    "slug": "reorder-list",
    "url": "https://leetcode.com/problems/reorder-list/",
    "diff": "Medium",
    "topic": "Linked List",
    "pattern": "Find Mid + Reverse + Interleave",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "L0 -> Ln -> L1 -> Ln-1... Find middle, reverse second half, interleave two halves node by node.",
    "algo": "1. Fast/slow to find mid. 2. Reverse second half. 3. Merge alternating nodes.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Severing first half's tail (mid.next = None) to avoid cycle."
  },
  {
    "id": 87,
    "title": "Add Two Numbers",
    "lc": 2,
    "slug": "add-two-numbers",
    "url": "https://leetcode.com/problems/add-two-numbers/",
    "diff": "Medium",
    "topic": "Linked List",
    "pattern": "Elementary Addition with Carry",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "mental": "Simulate schoolbook addition column by column, maintaining carry.",
    "algo": "dummy = ListNode(0); curr = dummy; carry = 0. While l1 or l2 or carry: val = (l1.val if l1 else 0) + (l2.val if l2 else 0) + carry; carry = val // 10; curr.next = ListNode(val % 10); curr = curr.next; advance l1, l2.",
    "tc": "O(max(N, M))",
    "sc": "O(max(N, M))",
    "trap": "Forgetting remaining carry after both lists are exhausted (e.g. 5 + 5 = 10)."
  },
  {
    "id": 88,
    "title": "Copy List with Random Pointer",
    "lc": 138,
    "slug": "copy-list-with-random-pointer",
    "url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
    "diff": "Medium",
    "topic": "Linked List",
    "pattern": "Interleaved Nodes / Hash Map",
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "mental": "Clone nodes and interleave them directly behind originals: A -> A' -> B -> B'. Assign randoms: curr.next.random = curr.random.next. Then unweave.",
    "algo": "1. Insert clone after each node. 2. Copy random pointers. 3. Separate cloned list from original.",
    "tc": "O(N)",
    "sc": "O(1) aux",
    "trap": "Handling null random pointers without throwing null pointer exceptions."
  },
  {
    "id": 89,
    "title": "Merge k Sorted Lists",
    "lc": 23,
    "slug": "merge-k-sorted-lists",
    "url": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "diff": "Hard",
    "topic": "Linked List",
    "pattern": "Min-Heap / Divide & Conquer",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft",
      "Apple"
    ],
    "mental": "Push first node of all k lists into min-heap. Pop smallest, attach to result, push popped node's next.",
    "algo": "heap = [(node.val, i, node) for i, node in enumerate(lists) if node]. heapify(heap). While heap: val, i, node = heappop(heap); tail.next = node; if node.next: heappush(heap, (node.next.val, i, node.next)).",
    "tc": "O(N log K)",
    "sc": "O(K)",
    "trap": "Python heap comparison requires index i as tiebreaker to avoid comparing ListNode instances directly."
  },
  {
    "id": 90,
    "title": "Reverse Nodes in k-Group",
    "lc": 25,
    "slug": "reverse-nodes-in-k-group",
    "url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
    "diff": "Hard",
    "topic": "Linked List",
    "pattern": "Iterative Segment Reversal",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "Count k nodes ahead. If >= k nodes remain, reverse those k nodes and stitch to previous and next segments.",
    "algo": "Check if k nodes exist. Reverse segment of k nodes. Recursively or iteratively connect to next reversed group.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Incomplete final group (< k nodes) must be left as-is."
  },
  {
    "id": 91,
    "title": "Palindrome Linked List",
    "lc": 234,
    "slug": "palindrome-linked-list",
    "url": "https://leetcode.com/problems/palindrome-linked-list/",
    "diff": "Easy",
    "topic": "Linked List",
    "pattern": "Midpoint + Reverse Second Half",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Find midpoint with fast/slow. Reverse second half. Compare values of first and second half.",
    "algo": "slow, fast = head, head. While fast and fast.next: slow = slow.next; fast = fast.next.next. Reverse from slow. Compare with head.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Restoring original list structure before returning (good engineering practice)."
  },
  {
    "id": 92,
    "title": "Intersection of Two Linked Lists",
    "lc": 160,
    "slug": "intersection-of-two-linked-lists",
    "url": "https://leetcode.com/problems/intersection-of-two-linked-lists/",
    "diff": "Easy",
    "topic": "Linked List",
    "pattern": "Two Pointer Loop Alignment",
    "companies": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "mental": "Pointer A walks list A then list B. Pointer B walks list B then list A. Both travel equal total distance (a + b) and meet at intersection or null.",
    "algo": "pA, pB = headA, headB. While pA != pB: pA = pA.next if pA else headB; pB = pB.next if pB else headA. Return pA.",
    "tc": "O(N + M)",
    "sc": "O(1)",
    "trap": "If no intersection, both reach None at end of second traversal simultaneously."
  },
  {
    "id": 93,
    "title": "Valid Parentheses",
    "lc": 20,
    "slug": "valid-parentheses",
    "url": "https://leetcode.com/problems/valid-parentheses/",
    "diff": "Easy",
    "topic": "Stack & Monotonic Stack",
    "pattern": "LIFO Matching",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Push open brackets, pop and verify closures match.",
    "algo": "Match top of stack with incoming closing bracket.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Popping empty stack."
  },
  {
    "id": 94,
    "title": "Min Stack",
    "lc": 155,
    "slug": "min-stack",
    "url": "https://leetcode.com/problems/min-stack/",
    "diff": "Medium",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Two Stacks / Value-Min Pairs",
    "companies": [
      "Amazon",
      "Bloomberg",
      "Google"
    ],
    "mental": "Stack elements store (value, current_min) pair so getMin() is instant O(1).",
    "algo": "push(val): new_min = min(val, min_stack[-1] if min_stack else val). Append (val, new_min). pop(): pop from stack. getMin(): return stack[-1][1].",
    "tc": "O(1) all ops",
    "sc": "O(N)",
    "trap": "Popping empty stack edge case."
  },
  {
    "id": 95,
    "title": "Evaluate Reverse Polish Notation",
    "lc": 150,
    "slug": "evaluate-reverse-polish-notation",
    "url": "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
    "diff": "Medium",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Operand Stack",
    "companies": [
      "Amazon",
      "Google",
      "LinkedIn"
    ],
    "mental": "Push numbers to stack. When operator encountered, pop top two operands, evaluate, push result.",
    "algo": "For token in tokens: if token in '+-*/': b = stack.pop(); a = stack.pop(); apply operator; stack.append(res); else: stack.append(int(token)).",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Truncation toward zero for division: in Python int(a / b), not a // b which truncates toward -inf."
  },
  {
    "id": 96,
    "title": "Daily Temperatures",
    "lc": 739,
    "slug": "daily-temperatures",
    "url": "https://leetcode.com/problems/daily-temperatures/",
    "diff": "Medium",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Monotonic Decreasing Stack",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Maintain stack of indices with decreasing temperatures. When warmer day arrives, pop and calculate distance.",
    "algo": "res = [0] * n, stack = []. For i, t in enumerate(temperatures): while stack and t > temperatures[stack[-1]]: prev_i = stack.pop(); res[prev_i] = i - prev_i. stack.append(i).",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Storing temperatures instead of indices in stack prevents computing distance."
  },
  {
    "id": 97,
    "title": "Next Greater Element I",
    "lc": 496,
    "slug": "next-greater-element-i",
    "url": "https://leetcode.com/problems/next-greater-element-i/",
    "diff": "Easy",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Monotonic Stack + Hash Map",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Find next greater element for all elements in nums2 using monotonic stack, cache in map, then query for nums1.",
    "algo": "stack = [], next_greater = {}. For x in nums2: while stack and x > stack[-1]: next_greater[stack.pop()] = x; stack.append(x). Return [next_greater.get(x, -1) for x in nums1].",
    "tc": "O(N + M)",
    "sc": "O(M)",
    "trap": "Elements with no greater element default to -1."
  },
  {
    "id": 98,
    "title": "Largest Rectangle in Histogram",
    "lc": 84,
    "slug": "largest-rectangle-in-histogram",
    "url": "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    "diff": "Hard",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Monotonic Increasing Stack",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "mental": "For each bar, rectangle height is limited by this bar. Extend left and right until shorter bar encountered.",
    "algo": "stack = [-1]. max_area = 0. Append 0 to heights as sentinel. For i, h in enumerate(heights): while stack[-1] != -1 and heights[stack[-1]] >= h: height = heights[stack.pop()]; width = i - stack[-1] - 1; max_area = max(max_area, height * width); stack.append(i).",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Sentinel 0 at end forces stack to flush completely without extra post-loop code."
  },
  {
    "id": 99,
    "title": "Car Fleet",
    "lc": 853,
    "slug": "car-fleet",
    "url": "https://leetcode.com/problems/car-fleet/",
    "diff": "Medium",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Monotonic Stack by Position",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Sort cars by starting position descending. Calculate time to finish. A car catches up if time <= fleet ahead.",
    "algo": "cars = sorted(zip(position, speed), reverse=True). times = [(target - p)/s for p, s in cars]. stack = []. For t in times: if not stack or t > stack[-1]: stack.append(t). Return len(stack).",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Cars can never pass each other; they join the fleet of the slower car ahead."
  },
  {
    "id": 100,
    "title": "Asteroid Collision",
    "lc": 735,
    "slug": "asteroid-collision",
    "url": "https://leetcode.com/problems/asteroid-collision/",
    "diff": "Medium",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Simulation Stack",
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "mental": "Positive asteroids move right, negative asteroids move left. Collision only occurs if top of stack > 0 and incoming < 0.",
    "algo": "stack = []. For a in asteroids: while stack and a < 0 < stack[-1]: if stack[-1] < -a: stack.pop(); continue; elif stack[-1] == -a: stack.pop(); break; else: stack.append(a).",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Two negative asteroids moving left never collide; two positive moving right never collide."
  },
  {
    "id": 101,
    "title": "Simplify Path",
    "lc": 71,
    "slug": "simplify-path",
    "url": "https://leetcode.com/problems/simplify-path/",
    "diff": "Medium",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Directory Stack",
    "companies": [
      "Meta",
      "Amazon",
      "Microsoft"
    ],
    "mental": "Split by '/'. '.' does nothing. '..' pops directory from stack. Named segments push to stack.",
    "algo": "stack = []. For part in path.split('/'): if part == '..': if stack: stack.pop(); elif part and part != '.': stack.append(part). Return '/' + '/'.join(stack).",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Root directory cannot be popped by '..'. Handle multiple consecutive slashes gracefully."
  },
  {
    "id": 102,
    "title": "Decode String",
    "lc": 394,
    "slug": "decode-string",
    "url": "https://leetcode.com/problems/decode-string/",
    "diff": "Medium",
    "topic": "Stack & Monotonic Stack",
    "pattern": "Nested Parentheses Stack",
    "companies": [
      "Google",
      "Amazon",
      "Bloomberg"
    ],
    "mental": "When encountering '[', push current string and current repeat number to stack. When ']', pop and repeat.",
    "algo": "stack = []; cur_num = 0; cur_str = ''. For c in s: if c.isdigit(): cur_num = cur_num * 10 + int(c); elif c == '[': stack.append((cur_str, cur_num)); cur_str = ''; cur_num = 0; elif c == ']': prev_str, num = stack.pop(); cur_str = prev_str + cur_str * num; else: cur_str += c. Return cur_str.",
    "tc": "O(Output Length)",
    "sc": "O(Output Length)",
    "trap": "Multi-digit numbers (e.g. '100[a]'). Parse properly."
  },
  {
    "id": 103,
    "title": "Implement Queue using Stacks",
    "lc": 232,
    "slug": "implement-queue-using-stacks",
    "url": "https://leetcode.com/problems/implement-queue-using-stacks/",
    "diff": "Easy",
    "topic": "Queue & Deque",
    "pattern": "Two Stacks Amortized O(1)",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "In-stack for pushing. Out-stack for popping. Transfer from in to out only when out is empty.",
    "algo": "push(x): in_stack.append(x). pop(): if not out_stack: while in_stack: out_stack.append(in_stack.pop()). Return out_stack.pop().",
    "tc": "Amortized O(1)",
    "sc": "O(N)",
    "trap": "Do not transfer on every push; only transfer when popping and out_stack is empty."
  },
  {
    "id": 104,
    "title": "Implement Stack using Queues",
    "lc": 225,
    "slug": "implement-stack-using-queues",
    "url": "https://leetcode.com/problems/implement-stack-using-queues/",
    "diff": "Easy",
    "topic": "Queue & Deque",
    "pattern": "Single Queue Rotation",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Push x to queue, then rotate preceding n-1 elements to the back of the queue.",
    "algo": "push(x): q.append(x); for _ in range(len(q) - 1): q.append(q.popleft()). pop(): return q.popleft().",
    "tc": "O(N) push, O(1) pop",
    "sc": "O(N)",
    "trap": "Queue only supports FIFO operations: append and popleft."
  },
  {
    "id": 105,
    "title": "Number of Recent Calls",
    "lc": 933,
    "slug": "number-of-recent-calls",
    "url": "https://leetcode.com/problems/number-of-recent-calls/",
    "diff": "Easy",
    "topic": "Queue & Deque",
    "pattern": "Sliding Time Window Queue",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Store ping timestamps in queue. Discard timestamps older than t - 3000.",
    "algo": "q.append(t); while q[0] < t - 3000: q.popleft(); return len(q).",
    "tc": "Amortized O(1)",
    "sc": "O(W)",
    "trap": "Timestamps are strictly increasing."
  },
  {
    "id": 106,
    "title": "Sliding Window Maximum",
    "lc": 239,
    "slug": "sliding-window-maximum",
    "url": "https://leetcode.com/problems/sliding-window-maximum/",
    "diff": "Hard",
    "topic": "Queue & Deque",
    "pattern": "Monotonic Deque Indices",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Maintain monotonic decreasing deque of indices. Front of deque is maximum.",
    "algo": "Pop smaller elements from back; evict expired indices from front.",
    "tc": "O(N)",
    "sc": "O(K)",
    "trap": "Storing indices instead of raw values."
  },
  {
    "id": 107,
    "title": "Design Circular Queue",
    "lc": 622,
    "slug": "design-circular-queue",
    "url": "https://leetcode.com/problems/design-circular-queue/",
    "diff": "Medium",
    "topic": "Queue & Deque",
    "pattern": "Array with Head & Tail Modulo",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Fixed-size array with head and count pointers. Index modulo capacity prevents shifting.",
    "algo": "enQueue(val): if isFull() return False; q[(head + count) % k] = val; count += 1. deQueue(): if isEmpty() return False; head = (head + 1) % k; count -= 1.",
    "tc": "O(1) all ops",
    "sc": "O(K)",
    "trap": "Distinguishing between full and empty queue without wasting one slot by using count variable."
  },
  {
    "id": 108,
    "title": "Rotting Oranges",
    "lc": 994,
    "slug": "rotting-oranges",
    "url": "https://leetcode.com/problems/rotting-oranges/",
    "diff": "Medium",
    "topic": "Queue & Deque",
    "pattern": "Multi-Source BFS Queue",
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta",
      "Google"
    ],
    "mental": "Add all initially rotten oranges to queue. Each minute, rot adjacent fresh oranges layer-by-layer.",
    "algo": "q = deque(all rotten coords); fresh = count fresh. minutes = 0. While q and fresh > 0: for _ in range(len(q)): r, c = q.popleft(); for dr, dc in directions: if fresh: mark rotten, fresh -= 1, q.append((nr, nc)). minutes += 1. Return minutes if fresh == 0 else -1.",
    "tc": "O(R * C)",
    "sc": "O(R * C)",
    "trap": "Isolated fresh orange that cannot be reached: return -1."
  },
  {
    "id": 109,
    "title": "Shortest Path in Binary Matrix",
    "lc": 1091,
    "slug": "shortest-path-in-binary-matrix",
    "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
    "diff": "Medium",
    "topic": "Queue & Deque",
    "pattern": "8-Directional BFS Queue",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "BFS explores shortest path layer-by-layer in unweighted 8-directional grid.",
    "algo": "If grid[0][0] != 0 or grid[n-1][n-1] != 0: return -1. q = deque([(0, 0, 1)]). Mark visited in-place. Pop, explore 8 neighbors.",
    "tc": "O(N^2)",
    "sc": "O(N^2)",
    "trap": "Marking visited at queue insertion time prevents pushing the same node multiple times."
  },
  {
    "id": 110,
    "title": "Maximum Depth of Binary Tree",
    "lc": 104,
    "slug": "maximum-depth-of-binary-tree",
    "url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "diff": "Easy",
    "topic": "Trees",
    "pattern": "DFS Depth Recursion",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Depth of tree is 1 + max(depth(left), depth(right)). Base case null node is depth 0.",
    "algo": "if not root: return 0; return 1 + max(maxDepth(root.left), maxDepth(root.right)).",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Stack overflow on skewed tree; iterative BFS can be used if call stack depth is a concern."
  },
  {
    "id": 111,
    "title": "Invert Binary Tree",
    "lc": 226,
    "slug": "invert-binary-tree",
    "url": "https://leetcode.com/problems/invert-binary-tree/",
    "diff": "Easy",
    "topic": "Trees",
    "pattern": "Recursive Node Swap",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "mental": "Swap left and right children recursively for every node.",
    "algo": "if not root: return None; root.left, root.right = invertTree(root.right), invertTree(root.left); return root.",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Swapping before or after recursive calls works as long as temporary assignment preserves references."
  },
  {
    "id": 112,
    "title": "Same Tree",
    "lc": 100,
    "slug": "same-tree",
    "url": "https://leetcode.com/problems/same-tree/",
    "diff": "Easy",
    "topic": "Trees",
    "pattern": "Simultaneous DFS Traversal",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Two trees are same if current values match and both left and right subtrees match.",
    "algo": "if not p and not q: return True; if not p or not q or p.val != q.val: return False; return isSameTree(p.left, q.left) and isSameTree(p.right, q.right).",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "One tree null while other non-null."
  },
  {
    "id": 113,
    "title": "Subtree of Another Tree",
    "lc": 572,
    "slug": "subtree-of-another-tree",
    "url": "https://leetcode.com/problems/subtree-of-another-tree/",
    "diff": "Easy",
    "topic": "Trees",
    "pattern": "DFS Search + isSameTree",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Check if isSameTree(root, subRoot). If not, recursively check root.left or root.right.",
    "algo": "if not root: return False; if isSameTree(root, subRoot): return True; return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot).",
    "tc": "O(N * M)",
    "sc": "O(H)",
    "trap": "Tree serialization with sentinels achieves linear O(N + M) using KMP."
  },
  {
    "id": 114,
    "title": "Diameter of Binary Tree",
    "lc": 543,
    "slug": "diameter-of-binary-tree",
    "url": "https://leetcode.com/problems/diameter-of-binary-tree/",
    "diff": "Easy",
    "topic": "Trees",
    "pattern": "Post-order Depth Accumulator",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Longest path through node = depth(left) + depth(right). Max diameter across all nodes.",
    "algo": "max_d = 0. def depth(node): nonlocal max_d; if not node: return 0; l, r = depth(node.left), depth(node.right); max_d = max(max_d, l + r); return 1 + max(l, r). depth(root); return max_d.",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Path doesn't necessarily pass through the root node."
  },
  {
    "id": 115,
    "title": "Balanced Binary Tree",
    "lc": 110,
    "slug": "balanced-binary-tree",
    "url": "https://leetcode.com/problems/balanced-binary-tree/",
    "diff": "Easy",
    "topic": "Trees",
    "pattern": "Bottom-Up Height Checking",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Return height of subtree if balanced, or -1 if unbalanced. Propagate -1 upward.",
    "algo": "def check(node): if not node: return 0; l = check(node.left); if l == -1: return -1; r = check(node.right); if r == -1 or abs(l - r) > 1: return -1; return 1 + max(l, r). Return check(root) != -1.",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Top-down approach recomputes height at every node resulting in O(N^2); bottom-up achieves O(N)."
  },
  {
    "id": 116,
    "title": "Binary Tree Level Order Traversal",
    "lc": 102,
    "slug": "binary-tree-level-order-traversal",
    "url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    "diff": "Medium",
    "topic": "Trees",
    "pattern": "Queue BFS Level-by-Level",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft"
    ],
    "mental": "Process queue in batches matching current queue size to group by level.",
    "algo": "q = deque([root] if root else []); res = []. While q: level = []; for _ in range(len(q)): node = q.popleft(); level.append(node.val); if node.left: q.append(node.left); if node.right: q.append(node.right); res.append(level). Return res.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Empty root returns empty list []."
  },
  {
    "id": 117,
    "title": "Binary Tree Right Side View",
    "lc": 199,
    "slug": "binary-tree-right-side-view",
    "url": "https://leetcode.com/problems/binary-tree-right-side-view/",
    "diff": "Medium",
    "topic": "Trees",
    "pattern": "BFS / Preorder Modified DFS",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "mental": "Last node in each level order traversal, or DFS visiting (root -> right -> left) picking first node at each depth.",
    "algo": "res = []. def dfs(node, depth): if not node: return; if depth == len(res): res.append(node.val); dfs(node.right, depth + 1); dfs(node.left, depth + 1). dfs(root, 0); return res.",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Only visiting right child fails if left subtree extends deeper than right subtree."
  },
  {
    "id": 118,
    "title": "Lowest Common Ancestor of a Binary Tree",
    "lc": 236,
    "slug": "lowest-common-ancestor-of-a-binary-tree",
    "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    "diff": "Medium",
    "topic": "Trees",
    "pattern": "Post-order Branch Traversal",
    "companies": [
      "Meta",
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "If current node is p or q, return current node. Search left and right. If both return non-null, current node is LCA.",
    "algo": "if not root or root == p or root == q: return root. l = lowestCommonAncestor(root.left, p, q); r = lowestCommonAncestor(root.right, p, q); if l and r: return root; return l or r.",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Assuming nodes always exist in tree. (Guaranteed by problem statement)."
  },
  {
    "id": 119,
    "title": "Binary Tree Maximum Path Sum",
    "lc": 124,
    "slug": "binary-tree-maximum-path-sum",
    "url": "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
    "diff": "Hard",
    "topic": "Trees",
    "pattern": "Post-order Subtree Contribution",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Path can branch at any node: root.val + max(0, left_gain) + max(0, right_gain). Function returns single-branch gain.",
    "algo": "max_sum = -inf. def gain(node): nonlocal max_sum; if not node: return 0; l = max(0, gain(node.left)); r = max(0, gain(node.right)); max_sum = max(max_sum, node.val + l + r); return node.val + max(l, r). gain(root); return max_sum.",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Negative subtree gains must be clamped to 0 with max(0, gain)."
  },
  {
    "id": 120,
    "title": "Serialize and Deserialize Binary Tree",
    "lc": 297,
    "slug": "serialize-and-deserialize-binary-tree",
    "url": "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
    "diff": "Hard",
    "topic": "Trees",
    "pattern": "Preorder Traversal with Null Markers",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "mental": "Preorder traversal with sentinel '#' for null nodes preserves complete tree structure uniquely.",
    "algo": "Serialize: root -> 'val,' + serialize(left) + serialize(right), '#' for null. Deserialize: iterator over split tokens, build node, recurse left, recurse right.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Multiple digit values or negative numbers; use delimiter like ','."
  },
  {
    "id": 121,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "lc": 105,
    "slug": "construct-binary-tree-from-preorder-and-inorder-traversal",
    "url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
    "diff": "Medium",
    "topic": "Trees",
    "pattern": "Divide & Conquer Index Map",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Preorder first element is root. Find root in Inorder: elements to left belong to left subtree, right belong to right.",
    "algo": "in_map = {val: i for i, val in enumerate(inorder)}. def build(pre_l, pre_r, in_l, in_r): if pre_l > pre_r: return None; root_val = preorder[pre_l]; idx = in_map[root_val]; left_size = idx - in_l; root = TreeNode(root_val); root.left = build(pre_l + 1, pre_l + left_size, in_l, idx - 1); root.right = build(pre_l + left_size + 1, pre_r, idx + 1, in_r); return root.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Using in_map gives O(N); using inorder.index(val) repeatedly causes O(N^2)."
  },
  {
    "id": 122,
    "title": "Path Sum",
    "lc": 112,
    "slug": "path-sum",
    "url": "https://leetcode.com/problems/path-sum/",
    "diff": "Easy",
    "topic": "Trees",
    "pattern": "Root-to-Leaf DFS Recursion",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Subtract node.val from target. If leaf node reached and remaining target == 0, path found.",
    "algo": "if not root: return False; if not root.left and not root.right: return root.val == targetSum; return hasPathSum(root.left, targetSum - root.val) or hasPathSum(root.right, targetSum - root.val).",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Path must end at a leaf node (both left and right null). A non-leaf node with target 0 is not a valid path."
  },
  {
    "id": 123,
    "title": "Binary Tree Zigzag Level Order Traversal",
    "lc": 103,
    "slug": "binary-tree-zigzag-level-order-traversal",
    "url": "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/",
    "diff": "Medium",
    "topic": "Trees",
    "pattern": "BFS Level Order with Direction Flag",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "Level order BFS. Reverse alternating levels, or use a deque to append/prepend based on direction flag.",
    "algo": "q = deque([root] if root else []); res = []; left_to_right = True. While q: level = deque(); for _ in range(len(q)): node = q.popleft(); if left_to_right: level.append(node.val); else: level.appendleft(node.val); push children to q. res.append(list(level)); left_to_right = not left_to_right.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Direction toggles on every level."
  },
  {
    "id": 124,
    "title": "Vertical Order Traversal of a Binary Tree",
    "lc": 987,
    "slug": "vertical-order-traversal-of-a-binary-tree",
    "url": "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/",
    "diff": "Hard",
    "topic": "Trees",
    "pattern": "Coordinate BFS/DFS + Multi-Key Sort",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Assign coordinates (row, col) with root at (0, 0). Left is (row+1, col-1), right is (row+1, col+1). Sort by col, then row, then value.",
    "algo": "Collect (col, row, val) for all nodes. Group by col, sort each column by (row, val).",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Tiebreaker rule: nodes at same (row, col) must be sorted in ascending order of their values."
  },
  {
    "id": 125,
    "title": "Validate Binary Search Tree",
    "lc": 98,
    "slug": "validate-binary-search-tree",
    "url": "https://leetcode.com/problems/validate-binary-search-tree/",
    "diff": "Medium",
    "topic": "Binary Search Tree (BST)",
    "pattern": "Min/Max Bounding Range DFS",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft"
    ],
    "mental": "Every node must satisfy min_val < node.val < max_val. Propagate bounds downward.",
    "algo": "def validate(node, low=-inf, high=inf): if not node: return True; if not (low < node.val < high): return False; return validate(node.left, low, node.val) and validate(node.right, node.val, high).",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Checking only node.left.val < node.val is insufficient; all nodes in left subtree must be < root.val."
  },
  {
    "id": 126,
    "title": "Search in a Binary Search Tree",
    "lc": 700,
    "slug": "search-in-a-binary-search-tree",
    "url": "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "diff": "Easy",
    "topic": "Binary Search Tree (BST)",
    "pattern": "BST Property Branching",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "If val < root.val search left; if val > root.val search right.",
    "algo": "curr = root; while curr: if val == curr.val: return curr; curr = curr.left if val < curr.val else curr.right. Return None.",
    "tc": "O(H)",
    "sc": "O(1)",
    "trap": "Iterative BST search uses O(1) space."
  },
  {
    "id": 127,
    "title": "Insert into a Binary Search Tree",
    "lc": 701,
    "slug": "insert-into-a-binary-search-tree",
    "url": "https://leetcode.com/problems/insert-into-a-binary-search-tree/",
    "diff": "Medium",
    "topic": "Binary Search Tree (BST)",
    "pattern": "BST Leaf Insertion",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Navigate BST until null pointer found, attach new TreeNode.",
    "algo": "curr = root; while curr: if val < curr.val: if not curr.left: curr.left = TreeNode(val); break; else: curr = curr.left; else: if not curr.right: curr.right = TreeNode(val); break; else: curr = curr.right. Return root or TreeNode(val).",
    "tc": "O(H)",
    "sc": "O(1)",
    "trap": "Inserting into empty tree root == None."
  },
  {
    "id": 128,
    "title": "Delete Node in a BST",
    "lc": 450,
    "slug": "delete-node-in-a-bst",
    "url": "https://leetcode.com/problems/delete-node-in-a-bst/",
    "diff": "Medium",
    "topic": "Binary Search Tree (BST)",
    "pattern": "Inorder Successor Replacement",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "If node has 2 children, replace its value with inorder successor (min node in right subtree), then delete successor.",
    "algo": "If val < root.val: root.left = delete(root.left, val); elif val > root.val: root.right = delete(root.right, val); else: if not root.left: return root.right; if not root.right: return root.left; succ = min_node(root.right); root.val = succ.val; root.right = delete(root.right, succ.val). Return root.",
    "tc": "O(H)",
    "sc": "O(H)",
    "trap": "Handling node with 0, 1, or 2 children correctly."
  },
  {
    "id": 129,
    "title": "Lowest Common Ancestor of a BST",
    "lc": 235,
    "slug": "lowest-common-ancestor-of-a-bst",
    "url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-bst/",
    "diff": "Medium",
    "topic": "Binary Search Tree (BST)",
    "pattern": "BST Range Splitting",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "If both p and q are < curr.val, LCA is in left subtree. If both >, right subtree. If they diverge, curr is LCA.",
    "algo": "curr = root; while curr: if p.val < curr.val and q.val < curr.val: curr = curr.left; elif p.val > curr.val and q.val > curr.val: curr = curr.right; else: return curr.",
    "tc": "O(H)",
    "sc": "O(1)",
    "trap": "Iterative takes O(1) space; no backtracking or recursion required."
  },
  {
    "id": 130,
    "title": "Kth Smallest Element in a BST",
    "lc": 230,
    "slug": "kth-smallest-element-in-a-bst",
    "url": "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
    "diff": "Medium",
    "topic": "Binary Search Tree (BST)",
    "pattern": "In-order Traversal Early Stop",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "In-order traversal of a BST visits nodes in strictly sorted ascending order. Return the kth visited node.",
    "algo": "stack = []; curr = root; while curr or stack: while curr: stack.append(curr); curr = curr.left; curr = stack.pop(); k -= 1; if k == 0: return curr.val; curr = curr.right.",
    "tc": "O(H + K)",
    "sc": "O(H)",
    "trap": "Iterative in-order terminates immediately at k without traversing remaining tree."
  },
  {
    "id": 131,
    "title": "Convert Sorted Array to Binary Search Tree",
    "lc": 108,
    "slug": "convert-sorted-array-to-binary-search-tree",
    "url": "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
    "diff": "Easy",
    "topic": "Binary Search Tree (BST)",
    "pattern": "Middle Element Root Recursion",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Mid element becomes root to guarantee height balance. Recursively build left and right subtrees.",
    "algo": "def build(l, r): if l > r: return None; mid = (l + r)//2; node = TreeNode(nums[mid]); node.left = build(l, mid - 1); node.right = build(mid + 1, r); return node. Return build(0, len(nums) - 1).",
    "tc": "O(N)",
    "sc": "O(log N)",
    "trap": "Mid calculation (l + r)//2."
  },
  {
    "id": 132,
    "title": "Recover Binary Search Tree",
    "lc": 99,
    "slug": "recover-binary-search-tree",
    "url": "https://leetcode.com/problems/recover-binary-search-tree/",
    "diff": "Medium",
    "topic": "Binary Search Tree (BST)",
    "pattern": "In-order Inversion Detection",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Two nodes swapped in BST cause 1 or 2 inversions in in-order sequence. Find the swapped pair and swap values.",
    "algo": "Track prev, first, second. In in-order traversal: if prev and prev.val > curr.val: if not first: first = prev; second = curr. Swap first.val and second.val.",
    "tc": "O(N)",
    "sc": "O(H)",
    "trap": "Morris traversal can achieve O(1) space by modifying tree pointers temporarily."
  },
  {
    "id": 133,
    "title": "Kth Largest Element in an Array",
    "lc": 215,
    "slug": "kth-largest-element-in-an-array",
    "url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
    "diff": "Medium",
    "topic": "Heap & Priority Queue",
    "pattern": "Min-Heap of Size K / Quickselect",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Maintain a min-heap of size k. At any moment, the root is the kth largest element seen so far.",
    "algo": "heap = []; for x in nums: heappush(heap, x); if len(heap) > k: heappop(heap). Return heap[0].",
    "tc": "O(N log K)",
    "sc": "O(K)",
    "trap": "Quickselect has average O(N) time but worst case O(N^2); Min-heap provides guaranteed O(N log K)."
  },
  {
    "id": 134,
    "title": "Last Stone Weight",
    "lc": 1046,
    "slug": "last-stone-weight",
    "url": "https://leetcode.com/problems/last-stone-weight/",
    "diff": "Easy",
    "topic": "Heap & Priority Queue",
    "pattern": "Max-Heap Simulation",
    "companies": [
      "Amazon"
    ],
    "mental": "Simulate smashing two heaviest stones using a max-heap (negated values in Python).",
    "algo": "heap = [-x for x in stones]; heapify(heap). While len(heap) > 1: s1 = -heappop(heap); s2 = -heappop(heap); if s1 != s2: heappush(heap, -(s1 - s2)). Return -heap[0] if heap else 0.",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Negate numbers when using Python's min-heap as max-heap."
  },
  {
    "id": 135,
    "title": "K Closest Points to Origin",
    "lc": 973,
    "slug": "k-closest-points-to-origin",
    "url": "https://leetcode.com/problems/k-closest-points-to-origin/",
    "diff": "Medium",
    "topic": "Heap & Priority Queue",
    "pattern": "Max-Heap of Size K",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Keep max-heap of size k storing points sorted by squared distance x^2 + y^2.",
    "algo": "heap = []; for x, y in points: dist = -(x*x + y*y); heappush(heap, (dist, x, y)); if len(heap) > k: heappop(heap). Return [[x, y] for _, x, y in heap].",
    "tc": "O(N log K)",
    "sc": "O(K)",
    "trap": "No need to compute sqrt; x^2 + y^2 maintains identical monotonicity."
  },
  {
    "id": 136,
    "title": "Top K Frequent Elements",
    "lc": 347,
    "slug": "top-k-frequent-elements",
    "url": "https://leetcode.com/problems/top-k-frequent-elements/",
    "diff": "Medium",
    "topic": "Heap & Priority Queue",
    "pattern": "Min-Heap or Bucket Sort",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Count frequencies, then use min-heap of size k or bucket sort.",
    "algo": "counts = Counter(nums). Min-heap on (freq, num) keeping size k.",
    "tc": "O(N log K)",
    "sc": "O(N)",
    "trap": "Bucket sort achieves pure O(N)."
  },
  {
    "id": 137,
    "title": "Find Median from Data Stream",
    "lc": 295,
    "slug": "find-median-from-data-stream",
    "url": "https://leetcode.com/problems/find-median-from-data-stream/",
    "diff": "Hard",
    "topic": "Heap & Priority Queue",
    "pattern": "Two Heaps (Max-Heap & Min-Heap)",
    "companies": [
      "Google",
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "mental": "Divide numbers into small half (max-heap) and large half (min-heap). Balance sizes so max_heap has at most 1 more element.",
    "algo": "small (max_heap), large (min_heap). heappush(small, -num); heappush(large, -heappop(small)). If len(large) > len(small): heappush(small, -heappop(large)). Median: -small[0] if odd else (-small[0] + large[0])/2.",
    "tc": "O(log N) add, O(1) find",
    "sc": "O(N)",
    "trap": "Balancing heaps after every insertion."
  },
  {
    "id": 138,
    "title": "Merge k Sorted Lists",
    "lc": 23,
    "slug": "merge-k-sorted-lists",
    "url": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "diff": "Hard",
    "topic": "Heap & Priority Queue",
    "pattern": "Min-Heap K Pointers",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Heap stores current head of each of the k lists.",
    "algo": "Pop min node, push node.next to heap.",
    "tc": "O(N log K)",
    "sc": "O(K)",
    "trap": "Tuple comparison collision in Python."
  },
  {
    "id": 139,
    "title": "Task Scheduler",
    "lc": 621,
    "slug": "task-scheduler",
    "url": "https://leetcode.com/problems/task-scheduler/",
    "diff": "Medium",
    "topic": "Heap & Priority Queue",
    "pattern": "Max Frequency Math / Max-Heap",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "The task with max frequency creates (max_freq - 1) chunks of size (n + 1). Fill empty slots with other tasks.",
    "algo": "counts = Counter(tasks). max_f = max(counts.values()). max_count = sum(1 for c in counts.values() if c == max_f). Return max(len(tasks), (max_f - 1) * (n + 1) + max_count).",
    "tc": "O(N)",
    "sc": "O(1) (26 letters)",
    "trap": "Idle time cannot be negative: max with total task count len(tasks)."
  },
  {
    "id": 140,
    "title": "Kth Smallest Element in a Sorted Matrix",
    "lc": 378,
    "slug": "kth-smallest-element-in-a-sorted-matrix",
    "url": "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/",
    "diff": "Medium",
    "topic": "Heap & Priority Queue",
    "pattern": "Min-Heap K Elements / Binary Search",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Rows are sorted. Push first element of each row into min-heap. Pop k-1 times, pushing next element in that row.",
    "algo": "heap = [(matrix[r][0], r, 0) for r in range(min(n, k))]; heapify(heap). Pop, push (matrix[r][c+1], r, c+1) if c+1 < n.",
    "tc": "O(K log N)",
    "sc": "O(N)",
    "trap": "Binary search on value range [matrix[0][0], matrix[n-1][n-1]] achieves O(N log(max-min)) with O(1) space."
  },
  {
    "id": 141,
    "title": "Meeting Rooms II",
    "lc": 253,
    "slug": "meeting-rooms-ii",
    "url": "https://leetcode.com/problems/meeting-rooms-ii/",
    "diff": "Medium",
    "topic": "Heap & Priority Queue",
    "pattern": "Min-Heap of End Times",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Bloomberg"
    ],
    "mental": "Sort meetings by start time. Min-heap stores end times of active meetings. If start >= earliest end, reuse room.",
    "algo": "intervals.sort(key=lambda x: x[0]). heap = [intervals[0][1]]. For start, end in intervals[1:]: if start >= heap[0]: heappop(heap); heappush(heap, end). Return len(heap).",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Start time >= end time allows reuse (meetings don't overlap if one ends when other starts)."
  },
  {
    "id": 142,
    "title": "Reorganize String",
    "lc": 767,
    "slug": "reorganize-string",
    "url": "https://leetcode.com/problems/reorganize-string/",
    "diff": "Medium",
    "topic": "Heap & Priority Queue",
    "pattern": "Max-Heap Interleaving",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Greedily place most frequent character. Use max-heap. Pop top, place, hold, pop second, push held back.",
    "algo": "counts = Counter(s). If max(counts.values()) > (len(s) + 1)//2: return ''. heap = [(-f, c) for c, f in counts.items()]; heapify(heap). res = []; prev = (0, ''). While heap: f, c = heappop(heap); res.append(c); if prev[0] < 0: heappush(heap, prev); prev = (f + 1, c). Return ''.join(res).",
    "tc": "O(N log A)",
    "sc": "O(A) (26 letters)",
    "trap": "Check if max_freq > (len(s) + 1)//2 upfront; impossible to arrange without adjacent duplicates."
  },
  {
    "id": 143,
    "title": "Merge Intervals",
    "lc": 56,
    "slug": "merge-intervals",
    "url": "https://leetcode.com/problems/merge-intervals/",
    "diff": "Medium",
    "topic": "Intervals",
    "pattern": "Sort by Start Time",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft",
      "Apple"
    ],
    "mental": "Sort intervals by start time. If current interval overlaps with previous (start <= prev.end), merge them: prev.end = max(prev.end, end).",
    "algo": "intervals.sort(key=lambda x: x[0]). merged = [intervals[0]]. For start, end in intervals[1:]: if start <= merged[-1][1]: merged[-1][1] = max(merged[-1][1], end); else: merged.append([start, end]). Return merged.",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Updating merged[-1][1] with max() rather than end, because previous interval might completely envelop current one."
  },
  {
    "id": 144,
    "title": "Insert Interval",
    "lc": 57,
    "slug": "insert-interval",
    "url": "https://leetcode.com/problems/insert-interval/",
    "diff": "Medium",
    "topic": "Intervals",
    "pattern": "Linear Three-Phase Merge",
    "companies": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "mental": "1. Add intervals ending before new.start. 2. Merge intervals overlapping new. 3. Add intervals starting after new.end.",
    "algo": "res = []; i = 0; n = len(intervals). While i < n and intervals[i][1] < new[0]: res.append(intervals[i]); i += 1. While i < n and intervals[i][0] <= new[1]: new[0] = min(new[0], intervals[i][0]); new[1] = max(new[1], intervals[i][1]); i += 1. res.append(new); res.extend(intervals[i:]). Return res.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Input is already sorted, so linear sweep achieves O(N) without re-sorting."
  },
  {
    "id": 145,
    "title": "Non-overlapping Intervals",
    "lc": 435,
    "slug": "non-overlapping-intervals",
    "url": "https://leetcode.com/problems/non-overlapping-intervals/",
    "diff": "Medium",
    "topic": "Intervals",
    "pattern": "Greedy Earliest End Time",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "To minimize removals, keep intervals that finish earliest (leaves maximum room for future intervals).",
    "algo": "intervals.sort(key=lambda x: x[1]). end = -inf, count = 0. For s, e in intervals: if s >= end: end = e; else: count += 1. Return count.",
    "tc": "O(N log N)",
    "sc": "O(1)",
    "trap": "Sorting by end time is the key greedy insight."
  },
  {
    "id": 146,
    "title": "Meeting Rooms",
    "lc": 252,
    "slug": "meeting-rooms",
    "url": "https://leetcode.com/problems/meeting-rooms/",
    "diff": "Easy",
    "topic": "Intervals",
    "pattern": "Sort & Overlap Check",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Sort by start time. If any interval starts before previous finishes, conflict exists.",
    "algo": "intervals.sort(key=lambda x: x[0]). For i in 1..n-1: if intervals[i][0] < intervals[i-1][1]: return False. Return True.",
    "tc": "O(N log N)",
    "sc": "O(1)",
    "trap": "Adjacent boundaries touching [1, 2] and [2, 3] do NOT conflict."
  },
  {
    "id": 147,
    "title": "Meeting Rooms II",
    "lc": 253,
    "slug": "meeting-rooms-ii",
    "url": "https://leetcode.com/problems/meeting-rooms-ii/",
    "diff": "Medium",
    "topic": "Intervals",
    "pattern": "Min-Heap / Chronological Sweep",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Track active meeting end times in min-heap.",
    "algo": "Sort by start, maintain heap of end times. Return heap size.",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Heap top represents earliest ending meeting."
  },
  {
    "id": 148,
    "title": "Minimum Number of Arrows to Burst Balloons",
    "lc": 452,
    "slug": "minimum-number-of-arrows-to-burst-balloons",
    "url": "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/",
    "diff": "Medium",
    "topic": "Intervals",
    "pattern": "Greedy Point Selection",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Shoot arrow at earliest finishing point of current cluster. Overlapping balloons burst with same arrow.",
    "algo": "points.sort(key=lambda x: x[1]). arrows = 1, arrow_pos = points[0][1]. For s, e in points[1:]: if s > arrow_pos: arrows += 1; arrow_pos = e. Return arrows.",
    "tc": "O(N log N)",
    "sc": "O(1)",
    "trap": "Integer overflow in comparator in languages like Java (use Integer.compare)."
  },
  {
    "id": 149,
    "title": "Employee Free Time",
    "lc": 759,
    "slug": "employee-free-time",
    "url": "https://leetcode.com/problems/employee-free-time/",
    "diff": "Hard",
    "topic": "Intervals",
    "pattern": "Interval Merging / Min-Heap",
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "mental": "Flatten all busy intervals, sort by start time, and merge. The gaps between merged intervals are common free time.",
    "algo": "Flatten schedules into list of intervals. Sort by start. Merge overlapping. Gaps between merged[i][1] and merged[i+1][0] are free.",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Start and end times of free time must be positive length."
  },
  {
    "id": 150,
    "title": "Interval List Intersections",
    "lc": 986,
    "slug": "interval-list-intersections",
    "url": "https://leetcode.com/problems/interval-list-intersections/",
    "diff": "Medium",
    "topic": "Intervals",
    "pattern": "Two Pointers Max Start / Min End",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Intersection of two intervals [a1, a2] and [b1, b2] is [max(a1, b1), min(a2, b2)]. Valid if start <= end.",
    "algo": "i = j = 0. While i < len(A) and j < len(B): s = max(A[i][0], B[j][0]); e = min(A[i][1], B[j][1]); if s <= e: res.append([s, e]); if A[i][1] < B[j][1]: i += 1; else: j += 1. Return res.",
    "tc": "O(N + M)",
    "sc": "O(1) aux",
    "trap": "Advance pointer whose interval finishes earlier (smaller end time)."
  },
  {
    "id": 151,
    "title": "Pow(x, n)",
    "lc": 50,
    "slug": "powx-n",
    "url": "https://leetcode.com/problems/powx-n/",
    "diff": "Medium",
    "topic": "Recursion",
    "pattern": "Binary Exponentiation",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "mental": "x^n = (x^2)^(n/2) if n is even; x * x^(n-1) if odd. Cuts power in half each step.",
    "algo": "def power(x, n): if n == 0: return 1.0; if n < 0: return 1.0 / power(x, -n); half = power(x, n // 2); return half * half if n % 2 == 0 else x * half * half.",
    "tc": "O(log N)",
    "sc": "O(log N)",
    "trap": "n = -2^31: negating -n in 32-bit signed integer causes overflow in C++."
  },
  {
    "id": 152,
    "title": "Fibonacci Number",
    "lc": 509,
    "slug": "fibonacci-number",
    "url": "https://leetcode.com/problems/fibonacci-number/",
    "diff": "Easy",
    "topic": "Recursion",
    "pattern": "Iterative / Memoized Recurrence",
    "companies": [
      "Amazon"
    ],
    "mental": "F(n) = F(n-1) + F(n-2). Base cases F(0)=0, F(1)=1.",
    "algo": "a, b = 0, 1. For _ in range(n): a, b = b, a + b. Return a.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Naive recursion is O(2^N); iterative memoization is O(N) time and O(1) space."
  },
  {
    "id": 153,
    "title": "Power of Two",
    "lc": 231,
    "slug": "power-of-two",
    "url": "https://leetcode.com/problems/power-of-two/",
    "diff": "Easy",
    "topic": "Recursion",
    "pattern": "Bitwise / Recursive Division",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "A power of two in binary has exactly one '1' bit: n > 0 and (n & (n - 1)) == 0.",
    "algo": "return n > 0 and (n & (n - 1)) == 0.",
    "tc": "O(1)",
    "sc": "O(1)",
    "trap": "n <= 0 are not powers of two."
  },
  {
    "id": 154,
    "title": "Reverse String",
    "lc": 344,
    "slug": "reverse-string",
    "url": "https://leetcode.com/problems/reverse-string/",
    "diff": "Easy",
    "topic": "Recursion",
    "pattern": "In-Place Two Pointer Swap",
    "companies": [
      "Amazon"
    ],
    "mental": "Swap s[l] and s[r] while advancing inward.",
    "algo": "l, r = 0, len(s) - 1. While l < r: s[l], s[r] = s[r], s[l]; l += 1; r -= 1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "In-place modification requirement."
  },
  {
    "id": 155,
    "title": "Generate Parentheses",
    "lc": 22,
    "slug": "generate-parentheses",
    "url": "https://leetcode.com/problems/generate-parentheses/",
    "diff": "Medium",
    "topic": "Recursion",
    "pattern": "Backtracking Pruning",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Can add '(' if open < n. Can add ')' if close < open.",
    "algo": "def backtrack(s, open_c, close_c): if len(s) == 2*n: res.append(s); return; if open_c < n: backtrack(s + '(', open_c + 1, close_c); if close_c < open_c: backtrack(s + ')', open_c, close_c + 1).",
    "tc": "O(4^N / sqrt(N))",
    "sc": "O(N)",
    "trap": "Never add ')' if close_c >= open_c."
  },
  {
    "id": 156,
    "title": "Subsets",
    "lc": 78,
    "slug": "subsets",
    "url": "https://leetcode.com/problems/subsets/",
    "diff": "Medium",
    "topic": "Recursion",
    "pattern": "Include / Exclude Decision Tree",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "At each index, decide whether to include nums[i] or exclude nums[i].",
    "algo": "res = []; path = []. def backtrack(start): res.append(list(path)); for i in start..n-1: path.append(nums[i]); backtrack(i + 1); path.pop(). backtrack(0); return res.",
    "tc": "O(2^N * N)",
    "sc": "O(N)",
    "trap": "Append a shallow copy list(path) to res, not the mutable reference path."
  },
  {
    "id": 157,
    "title": "Permutations",
    "lc": 46,
    "slug": "permutations",
    "url": "https://leetcode.com/problems/permutations/",
    "diff": "Medium",
    "topic": "Recursion",
    "pattern": "State Array Backtracking",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Try every unused number at each position.",
    "algo": "def backtrack(): if len(path) == n: res.append(list(path)); return; for x in nums: if x not in used: used.add(x); path.append(x); backtrack(); path.pop(); used.remove(x).",
    "tc": "O(N! * N)",
    "sc": "O(N)",
    "trap": "O(1) lookup with boolean array or set for 'used'."
  },
  {
    "id": 158,
    "title": "Combination Sum",
    "lc": 39,
    "slug": "combination-sum",
    "url": "https://leetcode.com/problems/combination-sum/",
    "diff": "Medium",
    "topic": "Recursion",
    "pattern": "Unbounded Choice Backtracking",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Can reuse same element multiple times. If remain == 0, record. If remain < 0, prune branch.",
    "algo": "def backtrack(remain, start): if remain == 0: res.append(list(path)); return; for i in start..n-1: if nums[i] > remain: break; path.append(nums[i]); backtrack(remain - nums[i], i); path.pop(). Sort nums, backtrack(target, 0).",
    "tc": "O(2^T)",
    "sc": "O(T)",
    "trap": "Sort upfront to break early when nums[i] > remain."
  },
  {
    "id": 159,
    "title": "Subsets",
    "lc": 78,
    "slug": "subsets",
    "url": "https://leetcode.com/problems/subsets/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "Power Set Generation",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Generate all 2^N subsets by exploring inclusion/exclusion at each index.",
    "algo": "Backtrack with start index: for i in range(start, n): append, recurse(i+1), pop.",
    "tc": "O(2^N * N)",
    "sc": "O(N)",
    "trap": "Appending path vs path[:] copy."
  },
  {
    "id": 160,
    "title": "Subsets II",
    "lc": 90,
    "slug": "subsets-ii",
    "url": "https://leetcode.com/problems/subsets-ii/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "Sort + Duplicate Pruning",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "mental": "Sort array. Skip duplicate elements at same recursion depth: if i > start and nums[i] == nums[i-1]: continue.",
    "algo": "Sort nums. In loop: if i > start and nums[i] == nums[i-1]: continue. Append, recurse(i + 1), pop.",
    "tc": "O(2^N * N)",
    "sc": "O(N)",
    "trap": "Checking i > start rather than i > 0 ensures duplicates across different depths are retained while duplicates at same level are skipped."
  },
  {
    "id": 161,
    "title": "Permutations",
    "lc": 46,
    "slug": "permutations",
    "url": "https://leetcode.com/problems/permutations/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "Full Permutation Generation",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Try all available candidates, track with boolean used array.",
    "algo": "Backtrack: loop all candidates, skip if used. Recurse, restore state.",
    "tc": "O(N! * N)",
    "sc": "O(N)",
    "trap": "Restoring state on backtrack."
  },
  {
    "id": 162,
    "title": "Permutations II",
    "lc": 47,
    "slug": "permutations-ii",
    "url": "https://leetcode.com/problems/permutations-ii/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "Sort + Prune Identical Branches",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Sort array. If nums[i] == nums[i-1] and not used[i-1], skip to avoid generating identical permutations.",
    "algo": "Sort nums. For i in 0..n-1: if used[i]: continue; if i > 0 and nums[i] == nums[i-1] and not used[i-1]: continue; used[i]=True; path.append(nums[i]); backtrack(); path.pop(); used[i]=False.",
    "tc": "O(N! * N)",
    "sc": "O(N)",
    "trap": "Skipping when not used[i-1] enforces picking duplicates in strictly left-to-right order."
  },
  {
    "id": 163,
    "title": "Combination Sum",
    "lc": 39,
    "slug": "combination-sum",
    "url": "https://leetcode.com/problems/combination-sum/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "Unbounded Backtracking",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Pick element, pass i to reuse it. Prune when sum exceeds target.",
    "algo": "Backtrack(remain - nums[i], i).",
    "tc": "O(2^T)",
    "sc": "O(T)",
    "trap": "Infinite recursion if 0 is in array (numbers are >= 2 in LC)."
  },
  {
    "id": 164,
    "title": "Combination Sum II",
    "lc": 40,
    "slug": "combination-sum-ii",
    "url": "https://leetcode.com/problems/combination-sum-ii/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "Single Use + Duplicate Pruning",
    "companies": [
      "Amazon",
      "Meta"
    ],
    "mental": "Each number used once. Sort. Skip if i > start and nums[i] == nums[i-1]. Recurse with i + 1.",
    "algo": "Sort nums. For i in start..n-1: if i > start and nums[i] == nums[i-1]: continue; if nums[i] > remain: break; path.append(nums[i]); backtrack(remain - nums[i], i + 1); path.pop().",
    "tc": "O(2^N)",
    "sc": "O(N)",
    "trap": "Recursing with i + 1 ensures single-use constraint."
  },
  {
    "id": 165,
    "title": "Letter Combinations of a Phone Number",
    "lc": 17,
    "slug": "letter-combinations-of-a-phone-number",
    "url": "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "Digit Mapping Backtracking",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Map digits to letter strings ('2' -> 'abc'). Branch on each letter for current digit.",
    "algo": "mapping = {'2': 'abc', ...}; def backtrack(idx): if idx == len(digits): res.append(''.join(path)); return; for c in mapping[digits[idx]]: path.append(c); backtrack(idx + 1); path.pop().",
    "tc": "O(4^N * N)",
    "sc": "O(N)",
    "trap": "Empty digits string '' should return empty list []."
  },
  {
    "id": 166,
    "title": "Word Search",
    "lc": 79,
    "slug": "word-search",
    "url": "https://leetcode.com/problems/word-search/",
    "diff": "Medium",
    "topic": "Backtracking",
    "pattern": "2D Grid DFS with Visited Mask",
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta",
      "Google"
    ],
    "mental": "From each cell matching word[0], run 4-directional DFS. Temporarily mask visited cell (e.g. grid[r][c] = '#'), restore after.",
    "algo": "def dfs(r, c, i): if i == len(word): return True; if out of bounds or grid[r][c] != word[i]: return False; temp = grid[r][c]; grid[r][c] = '#'; found = any(dfs(nr, nc, i+1) for nr, nc in neighbors); grid[r][c] = temp; return found.",
    "tc": "O(R * C * 3^L)",
    "sc": "O(L)",
    "trap": "Restoring grid[r][c] = temp on backtrack. Prune: reverse word if word[-1] is rarer than word[0]."
  },
  {
    "id": 167,
    "title": "N-Queens",
    "lc": 51,
    "slug": "n-queens",
    "url": "https://leetcode.com/problems/n-queens/",
    "diff": "Hard",
    "topic": "Backtracking",
    "pattern": "Column & Diagonal Constraint Sets",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "mental": "Place queen row by row. Track occupied columns, positive diagonals (r + c), and negative diagonals (r - c).",
    "algo": "cols = set(), diag1 = set(), diag2 = set(). def place(r): if r == n: build_board(); return; for c in range(n): if c in cols or (r+c) in diag1 or (r-c) in diag2: continue; add sets; place(r + 1); remove sets.",
    "tc": "O(N!)",
    "sc": "O(N)",
    "trap": "r + c identifies anti-diagonals, r - c identifies main diagonals."
  },
  {
    "id": 168,
    "title": "Sudoku Solver",
    "lc": 37,
    "slug": "sudoku-solver",
    "url": "https://leetcode.com/problems/sudoku-solver/",
    "diff": "Hard",
    "topic": "Backtracking",
    "pattern": "Exact Cover Constraint Backtracking",
    "companies": [
      "Google",
      "Microsoft",
      "Amazon"
    ],
    "mental": "Find empty cell. Try digits '1'-'9'. Verify row, col, and 3x3 box constraints. If valid, recurse. Backtrack if dead end.",
    "algo": "def solve(): for r in 0..8: for c in 0..8: if board[r][c] == '.': for d in '1'..'9': if is_valid(r, c, d): board[r][c] = d; if solve(): return True; board[r][c] = '.'; return False; return True.",
    "tc": "O(9^(empty cells))",
    "sc": "O(1) (81 cells)",
    "trap": "Returning boolean True/False stops search immediately on first valid solved board."
  },
  {
    "id": 169,
    "title": "Best Time to Buy and Sell Stock",
    "lc": 121,
    "slug": "best-time-to-buy-and-sell-stock",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "diff": "Easy",
    "topic": "Greedy",
    "pattern": "Prefix Minimum Greedy",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "Track running min price. Max profit is price - min_price.",
    "algo": "Greedy single pass updating min_price and max_profit.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Selling on future days only."
  },
  {
    "id": 170,
    "title": "Jump Game",
    "lc": 55,
    "slug": "jump-game",
    "url": "https://leetcode.com/problems/jump-game/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "Farthest Reachable Index",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft"
    ],
    "mental": "Maintain max_reach seen so far. If current index i > max_reach, you are stuck.",
    "algo": "max_reach = 0. For i, jump in enumerate(nums): if i > max_reach: return False; max_reach = max(max_reach, i + jump); if max_reach >= n - 1: return True. Return True.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Early exit if max_reach >= n - 1."
  },
  {
    "id": 171,
    "title": "Jump Game II",
    "lc": 45,
    "slug": "jump-game-ii",
    "url": "https://leetcode.com/problems/jump-game-ii/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "BFS-Style Greedy Windows",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Current jump covers range [cur_end..cur_end]. Find max reachable within current window, advance window boundary.",
    "algo": "jumps = 0, cur_end = 0, farthest = 0. For i in range(n - 1): farthest = max(farthest, i + nums[i]); if i == cur_end: jumps += 1; cur_end = farthest. Return jumps.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Loop up to n - 2, because when at n - 1 you have already reached the end."
  },
  {
    "id": 172,
    "title": "Gas Station",
    "lc": 134,
    "slug": "gas-station",
    "url": "https://leetcode.com/problems/gas-station/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "Global vs Local Deficit Greedy",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "If total gas >= total cost, a solution is guaranteed to exist. If tank drops below 0 at station i, starting station must be i + 1.",
    "algo": "total_tank = 0, cur_tank = 0, start = 0. For i in range(n): diff = gas[i] - cost[i]; total_tank += diff; cur_tank += diff; if cur_tank < 0: start = i + 1; cur_tank = 0. Return start if total_tank >= 0 else -1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "No need to simulate circular tour from start; total_tank >= 0 mathematically guarantees completion."
  },
  {
    "id": 173,
    "title": "Partition Labels",
    "lc": 763,
    "slug": "partition-labels",
    "url": "https://leetcode.com/problems/partition-labels/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "Last Occurrence Window Expansion",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Find last occurrence of each character. A partition must extend until all characters inside have completed their last occurrence.",
    "algo": "last = {c: i for i, c in enumerate(s)}. start = 0, end = 0, res = []. For i, c in enumerate(s): end = max(end, last[c]); if i == end: res.append(end - start + 1); start = i + 1. Return res.",
    "tc": "O(N)",
    "sc": "O(1) (26 letters)",
    "trap": "Updating end = max(end, last[c]) guarantees all characters inside window stay inside partition."
  },
  {
    "id": 174,
    "title": "Assign Cookies",
    "lc": 455,
    "slug": "assign-cookies",
    "url": "https://leetcode.com/problems/assign-cookies/",
    "diff": "Easy",
    "topic": "Greedy",
    "pattern": "Two Pointers Greedy Match",
    "companies": [
      "Amazon"
    ],
    "mental": "Sort children greeds and cookie sizes. Give smallest sufficient cookie to least greedy child.",
    "algo": "g.sort(); s.sort(). i = j = 0. While i < len(g) and j < len(s): if s[j] >= g[i]: i += 1; j += 1. Return i.",
    "tc": "O(N log N + M log M)",
    "sc": "O(1)",
    "trap": "Sorting both arrays allows optimal greedy matching."
  },
  {
    "id": 175,
    "title": "Maximum Subarray",
    "lc": 53,
    "slug": "maximum-subarray",
    "url": "https://leetcode.com/problems/maximum-subarray/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "Kadane's Greedy Restart",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Reset running sum when it becomes negative.",
    "algo": "cur_sum = max(x, cur_sum + x).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "All negative numbers case."
  },
  {
    "id": 176,
    "title": "Non-overlapping Intervals",
    "lc": 435,
    "slug": "non-overlapping-intervals",
    "url": "https://leetcode.com/problems/non-overlapping-intervals/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "Earliest End Time Removal",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "mental": "Keep intervals that finish earliest to leave room for others.",
    "algo": "Sort by end time. Count non-conflicting.",
    "tc": "O(N log N)",
    "sc": "O(1)",
    "trap": "Sorting by end vs start."
  },
  {
    "id": 177,
    "title": "Task Scheduler",
    "lc": 621,
    "slug": "task-scheduler",
    "url": "https://leetcode.com/problems/task-scheduler/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "Frequency Chunk Math",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "mental": "Max frequency sets the baseline grid of chunks.",
    "algo": "(max_f - 1) * (n + 1) + count of tasks with max_f.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Total tasks can exceed formula when idle slots fill up."
  },
  {
    "id": 178,
    "title": "Hand of Straights",
    "lc": 846,
    "slug": "hand-of-straights",
    "url": "https://leetcode.com/problems/hand-of-straights/",
    "diff": "Medium",
    "topic": "Greedy",
    "pattern": "Sorted Map / Frequency Greedy",
    "companies": [
      "Google"
    ],
    "mental": "Smallest available card must start a group of size groupSize: [x, x+1, ..., x+groupSize-1]. Decrement counts.",
    "algo": "counts = Counter(hand). For x in sorted(counts): if counts[x] > 0: need = counts[x]; for k in range(groupSize): if counts[x + k] < need: return False; counts[x + k] -= need. Return True.",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "len(hand) % groupSize != 0 check upfront."
  },
  {
    "id": 179,
    "title": "Number of Islands",
    "lc": 200,
    "slug": "number-of-islands",
    "url": "https://leetcode.com/problems/number-of-islands/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Grid BFS/DFS Connected Components",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Bloomberg"
    ],
    "mental": "Iterate cells. When '1' encountered, increment island count and run BFS/DFS to sink all connected '1's to '0'.",
    "algo": "For r in 0..R-1: for c in 0..C-1: if grid[r][c] == '1': islands += 1; sink_dfs(r, c). sink_dfs sets grid[r][c] = '0' and explores 4 directions.",
    "tc": "O(R * C)",
    "sc": "O(R * C)",
    "trap": "Call stack overflow on very large grids in DFS; BFS or iterative DFS avoids stack depth limits."
  },
  {
    "id": 180,
    "title": "Clone Graph",
    "lc": 133,
    "slug": "clone-graph",
    "url": "https://leetcode.com/problems/clone-graph/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "DFS / BFS Node Hash Map",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Map original node to cloned node. When visiting a node, clone it, add to map, and recursively clone its neighbors.",
    "algo": "cloned = {}. def clone(node): if not node: return None; if node in cloned: return cloned[node]; copy = Node(node.val); cloned[node] = copy; copy.neighbors = [clone(n) for n in node.neighbors]; return copy. Return clone(node).",
    "tc": "O(V + E)",
    "sc": "O(V)",
    "trap": "Graph with cycles will cause infinite recursion without cloned cache."
  },
  {
    "id": 181,
    "title": "Max Area of Island",
    "lc": 695,
    "slug": "max-area-of-island",
    "url": "https://leetcode.com/problems/max-area-of-island/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Grid DFS Area Accumulator",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Similar to Number of Islands, but DFS returns 1 + sum of areas of 4 adjacent neighbors.",
    "algo": "def dfs(r, c): if out of bounds or grid[r][c] != 1: return 0; grid[r][c] = 0; return 1 + dfs(r+1,c) + dfs(r-1,c) + dfs(r,c+1) + dfs(r,c-1). max_area = max(dfs(r, c) for r, c in all cells).",
    "tc": "O(R * C)",
    "sc": "O(R * C)",
    "trap": "Sinking grid[r][c] = 0 prevents revisiting."
  },
  {
    "id": 182,
    "title": "Pacific Atlantic Water Flow",
    "lc": 417,
    "slug": "pacific-atlantic-water-flow",
    "url": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Reverse Multi-Source BFS/DFS",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Water flows downhill from cells to oceans. Instead, reverse: flow uphill from Pacific borders and Atlantic borders. Find intersection.",
    "algo": "Run DFS from Pacific border cells (top row, left col). Run DFS from Atlantic border cells (bottom row, right col). Only traverse to neighbors with height >= current cell. Return cells visited by both.",
    "tc": "O(R * C)",
    "sc": "O(R * C)",
    "trap": "Flowing from every cell to oceans causes TLE; reverse traversal from oceans to cells is linear."
  },
  {
    "id": 183,
    "title": "Surrounded Regions",
    "lc": 130,
    "slug": "surrounded-regions",
    "url": "https://leetcode.com/problems/surrounded-regions/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Boundary Connected Component DFS",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Any 'O' connected to the board boundary cannot be captured. Mark boundary-connected 'O's with 'E', flip remaining 'O's to 'X', restore 'E' to 'O'.",
    "algo": "1. DFS from all 4 boundaries marking 'O' as 'E'. 2. Sweep entire grid: if 'O' -> 'X'; if 'E' -> 'O'.",
    "tc": "O(R * C)",
    "sc": "O(R * C)",
    "trap": "Only 'O's completely enclosed by 'X' on all 4 sides are captured."
  },
  {
    "id": 184,
    "title": "Rotting Oranges",
    "lc": 994,
    "slug": "rotting-oranges",
    "url": "https://leetcode.com/problems/rotting-oranges/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Multi-Source BFS Queue",
    "companies": [
      "Amazon",
      "Microsoft",
      "Meta"
    ],
    "mental": "Start BFS simultaneously from all rotten oranges.",
    "algo": "Layer-by-layer BFS rotting fresh oranges. Return minutes.",
    "tc": "O(R * C)",
    "sc": "O(R * C)",
    "trap": "Check if any fresh oranges remain."
  },
  {
    "id": 185,
    "title": "Word Ladder",
    "lc": 127,
    "slug": "word-ladder",
    "url": "https://leetcode.com/problems/word-ladder/",
    "diff": "Hard",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Bidirectional BFS Shortest Path",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Shortest transformation sequence is shortest path in unweighted graph. Word transitions differ by 1 letter.",
    "algo": "word_set = set(wordList). q = deque([(beginWord, 1)]). While q: word, steps = q.popleft(); if word == endWord: return steps; for i in range(len(word)): for c in 'a'..'z': next_w = word[:i] + c + word[i+1:]; if next_w in word_set: word_set.remove(next_w); q.append((next_w, steps + 1)). Return 0.",
    "tc": "O(M^2 * N)",
    "sc": "O(M * N)",
    "trap": "Removing words from word_set upon queueing prevents revisiting and loops."
  },
  {
    "id": 186,
    "title": "Number of Connected Components in an Undirected Graph",
    "lc": 323,
    "slug": "number-of-connected-components-in-an-undirected-graph",
    "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Union Find / DFS",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Count isolated clusters in an undirected graph.",
    "algo": "Build adjacency list. Iterate nodes, run DFS if unvisited, increment count.",
    "tc": "O(V + E)",
    "sc": "O(V + E)",
    "trap": "Disconnected nodes with 0 edges are still distinct components."
  },
  {
    "id": 187,
    "title": "Graph Valid Tree",
    "lc": 261,
    "slug": "graph-valid-tree",
    "url": "https://leetcode.com/problems/graph-valid-tree/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Cycle Detection + Connectivity",
    "companies": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "mental": "A valid tree with n nodes must have exactly n - 1 edges AND be fully connected (no cycles).",
    "algo": "If len(edges) != n - 1: return False. Build adjacency list. Run BFS/DFS from node 0. Return len(visited) == n.",
    "tc": "O(V + E)",
    "sc": "O(V + E)",
    "trap": "Checking edge count == n - 1 eliminates cycle checking if graph is connected."
  },
  {
    "id": 188,
    "title": "Course Schedule",
    "lc": 207,
    "slug": "course-schedule",
    "url": "https://leetcode.com/problems/course-schedule/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Topological Sort / Kahn's / Cycle Detection",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "mental": "Prerequisites form a directed graph. Can finish all courses if and only if graph has NO directed cycles.",
    "algo": "Compute in-degrees. q = deque(nodes with in_degree 0). While q: u = q.popleft(); count += 1; for v in adj[u]: in_degree[v] -= 1; if in_degree[v] == 0: q.append(v). Return count == numCourses.",
    "tc": "O(V + E)",
    "sc": "O(V + E)",
    "trap": "Self-loops or mutual dependencies (e.g. 0->1, 1->0) leave in-degrees > 0, detecting cycle."
  },
  {
    "id": 189,
    "title": "Course Schedule II",
    "lc": 210,
    "slug": "course-schedule-ii",
    "url": "https://leetcode.com/problems/course-schedule-ii/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Topological Sort Ordering",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Same as Course Schedule I, but record order of nodes popped from queue.",
    "algo": "Kahn's algorithm: append popped node to order. Return order if len(order) == numCourses else [].",
    "tc": "O(V + E)",
    "sc": "O(V + E)",
    "trap": "If cycle exists, return empty array []."
  },
  {
    "id": 190,
    "title": "Word Search",
    "lc": 79,
    "slug": "word-search",
    "url": "https://leetcode.com/problems/word-search/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "2D Grid DFS",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "Backtracking DFS on grid cells.",
    "algo": "Match characters, mask visited, explore 4 neighbors.",
    "tc": "O(R * C * 3^L)",
    "sc": "O(L)",
    "trap": "Restoring visited state."
  },
  {
    "id": 191,
    "title": "Network Delay Time",
    "lc": 743,
    "slug": "network-delay-time",
    "url": "https://leetcode.com/problems/network-delay-time/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Dijkstra's Shortest Path",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Find time for signal to reach all nodes. Shortest path from source k to all nodes in directed weighted graph with non-negative weights.",
    "algo": "adj = defaultdict(list). For u, v, w in times: adj[u].append((v, w)). pq = [(0, k)]. dist = {}. While pq: d, u = heappop(pq); if u in dist: continue; dist[u] = d; for v, w in adj[u]: if v not in dist: heappush(pq, (d + w, v)). Return max(dist.values()) if len(dist) == n else -1.",
    "tc": "O(E log V)",
    "sc": "O(V + E)",
    "trap": "Dijkstra requires non-negative weights. If graph disconnected, return -1."
  },
  {
    "id": 192,
    "title": "Cheapest Flights Within K Stops",
    "lc": 787,
    "slug": "cheapest-flights-within-k-stops",
    "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Bellman-Ford / Modified Dijkstra",
    "companies": [
      "Amazon",
      "Google",
      "Airbnb"
    ],
    "mental": "Find cheapest price with at most k stops (k + 1 edges). Bellman-Ford runs k + 1 relaxation passes.",
    "algo": "prices = [inf] * n; prices[src] = 0. For _ in range(k + 1): temp = list(prices); for u, v, p in flights: temp[v] = min(temp[v], prices[u] + p); prices = temp. Return prices[dst] if prices[dst] != inf else -1.",
    "tc": "O(K * E)",
    "sc": "O(V)",
    "trap": "Must use temp copy of prices to avoid chaining more than 1 edge per relaxation step."
  },
  {
    "id": 193,
    "title": "Dijkstra Implementation",
    "lc": 743,
    "slug": "network-delay-time",
    "url": "https://leetcode.com/problems/network-delay-time/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Priority Queue Dijkstra Template",
    "companies": [
      "Google",
      "Uber",
      "Amazon"
    ],
    "mental": "Standard Dijkstra single-source shortest path template using min-heap.",
    "algo": "Maintain dist array initialized to infinity. Push (0, src) to heap. Pop shortest, update neighbors, push improvements.",
    "tc": "O(E log V)",
    "sc": "O(V + E)",
    "trap": "Skip popped entries where dist[u] < popped_dist (stale heap entries)."
  },
  {
    "id": 194,
    "title": "Bellman-Ford Basics",
    "lc": 787,
    "slug": "cheapest-flights-within-k-stops",
    "url": "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Edge Relaxation",
    "companies": [
      "Google",
      "Uber"
    ],
    "mental": "Relax all E edges V-1 times. Detects negative weight cycles.",
    "algo": "For i in 1..V-1: for u, v, w in edges: dist[v] = min(dist[v], dist[u] + w).",
    "tc": "O(V * E)",
    "sc": "O(V)",
    "trap": "Can handle negative weights unlike Dijkstra."
  },
  {
    "id": 195,
    "title": "Shortest Path in Binary Matrix",
    "lc": 1091,
    "slug": "shortest-path-in-binary-matrix",
    "url": "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "8-Directional BFS",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "mental": "Unweighted shortest path from top-left to bottom-right.",
    "algo": "BFS queue with (r, c, dist). Mark visited.",
    "tc": "O(N^2)",
    "sc": "O(N^2)",
    "trap": "Diagonal moves permitted."
  },
  {
    "id": 196,
    "title": "Path With Minimum Effort",
    "lc": 1631,
    "slug": "path-with-minimum-effort",
    "url": "https://leetcode.com/problems/path-with-minimum-effort/",
    "diff": "Medium",
    "topic": "Graphs (BFS / DFS & Shortest Path)",
    "pattern": "Dijkstra on Maximum Edge Weight",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Effort of path is maximum absolute difference between consecutive cells. Find path minimizing this max effort.",
    "algo": "Dijkstra where edge weight is abs(height[nr][nc] - height[r][c]). Min-heap stores (effort, r, c). Pop min effort, relax 4 neighbors with max(effort, diff).",
    "tc": "O(R * C log(R * C))",
    "sc": "O(R * C)",
    "trap": "Can also be solved via Binary Search on answer effort in range [0, 10^6] with BFS validation."
  },
  {
    "id": 197,
    "title": "Number of Connected Components in an Undirected Graph",
    "lc": 323,
    "slug": "number-of-connected-components-in-an-undirected-graph",
    "url": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    "diff": "Medium",
    "topic": "Union Find / DSU",
    "pattern": "DSU Component Counting",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "Start with n components. For each edge (u, v), union(u, v). If union merges two disjoint sets, decrement components.",
    "algo": "parent = list(range(n)), rank = [1]*n, count = n. def find(i): if parent[i] != i: parent[i] = find(parent[i]); return parent[i]. def union(i, j): ... return count.",
    "tc": "O(E * alpha(V))",
    "sc": "O(V)",
    "trap": "Path compression reduces find to nearly O(1) amortized."
  },
  {
    "id": 198,
    "title": "Redundant Connection",
    "lc": 684,
    "slug": "redundant-connection",
    "url": "https://leetcode.com/problems/redundant-connection/",
    "diff": "Medium",
    "topic": "Union Find / DSU",
    "pattern": "DSU Cycle Detection",
    "companies": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "mental": "A tree with n nodes and n edges has exactly one cycle. The edge whose two vertices are already in same component completes the cycle.",
    "algo": "For u, v in edges: if find(u) == find(v): return [u, v]; union(u, v).",
    "tc": "O(N * alpha(N))",
    "sc": "O(N)",
    "trap": "Return the last edge in the input that caused the cycle."
  },
  {
    "id": 199,
    "title": "Accounts Merge",
    "lc": 721,
    "slug": "accounts-merge",
    "url": "https://leetcode.com/problems/accounts-merge/",
    "diff": "Medium",
    "topic": "Union Find / DSU",
    "pattern": "DSU Email Grouping",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Union all emails belonging to the same account. Group emails by their root parent email, sort, and prepend account name.",
    "algo": "Map email -> index. Union all adjacent emails in each account. Group emails by find(email), sort emails, add account name.",
    "tc": "O(N * K log K)",
    "sc": "O(N * K)",
    "trap": "Different people can have identical names. Never union names; only union shared emails."
  },
  {
    "id": 200,
    "title": "Number of Provinces",
    "lc": 547,
    "slug": "number-of-provinces",
    "url": "https://leetcode.com/problems/number-of-provinces/",
    "diff": "Medium",
    "topic": "Union Find / DSU",
    "pattern": "Adjacency Matrix DSU",
    "companies": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "mental": "Connected cities form a province. Union(i, j) for all isConnected[i][j] == 1.",
    "algo": "n = len(isConnected). DSU with count = n. For i in 0..n-1: for j in i+1..n-1: if isConnected[i][j]: union(i, j). Return dsu.count.",
    "tc": "O(N^2 * alpha(N))",
    "sc": "O(N)",
    "trap": "Undirected graph; only need to check j > i in upper triangle."
  },
  {
    "id": 201,
    "title": "Most Stones Removed with Same Row or Column",
    "lc": 947,
    "slug": "most-stones-removed-with-same-row-or-column",
    "url": "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/",
    "diff": "Medium",
    "topic": "Union Find / DSU",
    "pattern": "DSU Row/Col Bipartite Union",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Stones sharing row or col belong to same connected component. Within any connected component of size S, we can remove S - 1 stones. Answer = total_stones - number_of_components.",
    "algo": "Union row r with col ~c (bitwise not ~c to differentiate col namespace from row namespace). Total stones minus number of unique root parents.",
    "tc": "O(N * alpha(N))",
    "sc": "O(N)",
    "trap": "Separate row namespace from column namespace (e.g. r and c + 10001)."
  },
  {
    "id": 202,
    "title": "Min Cost to Connect All Points (Kruskal's MST)",
    "lc": 1584,
    "slug": "min-cost-to-connect-all-points",
    "url": "https://leetcode.com/problems/min-cost-to-connect-all-points/",
    "diff": "Medium",
    "topic": "Union Find / DSU",
    "pattern": "Kruskal's Algorithm / Prim's",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Minimum Spanning Tree (MST) on complete graph. All pairwise Manhattan distances. Sort edges by weight, union until n - 1 edges.",
    "algo": "Build all N*(N-1)/2 edges (dist, i, j). Sort by dist. Iterate edges: if union(i, j): total_cost += dist, edges_count += 1. If edges_count == n - 1: break. Return total_cost.",
    "tc": "O(N^2 log N)",
    "sc": "O(N^2)",
    "trap": "Prim's algorithm with min-heap avoids generating all edges upfront, achieving O(N^2) time and O(N) space."
  },
  {
    "id": 203,
    "title": "Implement Trie (Prefix Tree)",
    "lc": 208,
    "slug": "implement-trie-prefix-tree",
    "url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
    "diff": "Medium",
    "topic": "Trie (Prefix Tree)",
    "pattern": "Tree of Character Arrays",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "mental": "Each node has a 26-child dictionary and an is_end boolean flag.",
    "algo": "insert(word): traverse/create children, mark is_end = True. search(word): traverse, return is_end. startsWith(prefix): traverse, return True if prefix exists.",
    "tc": "O(L) per op",
    "sc": "O(Total Chars * 26)",
    "trap": "distinguishing between startsWith (node exists) and search (is_end must be True)."
  },
  {
    "id": 204,
    "title": "Design Add and Search Words Data Structure",
    "lc": 211,
    "slug": "design-add-and-search-words-data-structure",
    "url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
    "diff": "Medium",
    "topic": "Trie (Prefix Tree)",
    "pattern": "Trie DFS with Wildcard '.'",
    "companies": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "mental": "Standard Trie, but when '.' encountered, recursively branch through all 26 existing children.",
    "algo": "dfs(node, idx): if idx == len(word): return node.is_end. c = word[idx]. If c == '.': return any(dfs(child, idx + 1) for child in node.children.values()). Else: if c not in node.children: return False; return dfs(node.children[c], idx + 1).",
    "tc": "O(L) best, O(26^L) worst",
    "sc": "O(Total Chars)",
    "trap": "Wildcard '.' branching."
  },
  {
    "id": 205,
    "title": "Word Search II",
    "lc": 212,
    "slug": "word-search-ii",
    "url": "https://leetcode.com/problems/word-search-ii/",
    "diff": "Hard",
    "topic": "Trie (Prefix Tree)",
    "pattern": "Grid DFS + Trie Pruning",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "mental": "Searching for multiple words in grid: build Trie of all words, then run single DFS from each grid cell traversing matching Trie branches.",
    "algo": "Build Trie. For r, c in all cells: dfs(r, c, root). If node has word, add to res and remove word from node to avoid duplicates. If node has no children, prune from parent.",
    "tc": "O(R * C * 3^L)",
    "sc": "O(Total Chars)",
    "trap": "Pruning Trie nodes when words are found dramatically speeds up runtime from TLE to top 5%."
  },
  {
    "id": 206,
    "title": "Replace Words",
    "lc": 648,
    "slug": "replace-words",
    "url": "https://leetcode.com/problems/replace-words/",
    "diff": "Medium",
    "topic": "Trie (Prefix Tree)",
    "pattern": "Trie Shortest Prefix Search",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Find shortest root prefix for each word in sentence.",
    "algo": "Insert dictionary roots into Trie. For each word in sentence, search Trie for shortest prefix where is_end is True.",
    "tc": "O(D * L + S)",
    "sc": "O(D * L)",
    "trap": "Stop at first is_end match to get the shortest root."
  },
  {
    "id": 207,
    "title": "Maximum XOR of Two Numbers in an Array",
    "lc": 421,
    "slug": "maximum-xor-of-two-numbers-in-an-array",
    "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    "diff": "Medium",
    "topic": "Trie (Prefix Tree)",
    "pattern": "Binary Bitwise Trie",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Insert 32-bit binary representations into binary Trie. For each number, greedily choose opposite bit (1 - bit) at each step to maximize XOR.",
    "algo": "Insert numbers into Trie of bits 0/1. For each number, query Trie by trying to traverse opposite bit (bit ^ 1). Accumulate max XOR.",
    "tc": "O(32 * N)",
    "sc": "O(32 * N)",
    "trap": "Bit shifting from MSB (31) down to LSB (0)."
  },
  {
    "id": 208,
    "title": "Longest Word in Dictionary",
    "lc": 720,
    "slug": "longest-word-in-dictionary",
    "url": "https://leetcode.com/problems/longest-word-in-dictionary/",
    "diff": "Medium",
    "topic": "Trie (Prefix Tree)",
    "pattern": "Trie DFS / Hash Set",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Word can be built one character at a time if all its prefixes exist in dictionary.",
    "algo": "Insert words into Trie. BFS/DFS only traversing children where is_end is True. Track longest lexicographical word.",
    "tc": "O(Total Chars)",
    "sc": "O(Total Chars)",
    "trap": "Lexicographical tiebreaker rule."
  },
  {
    "id": 209,
    "title": "Climbing Stairs",
    "lc": 70,
    "slug": "climbing-stairs",
    "url": "https://leetcode.com/problems/climbing-stairs/",
    "diff": "Easy",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Fibonacci Recurrence",
    "companies": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "mental": "To reach step n, you must jump from step n-1 or n-2: dp[n] = dp[n-1] + dp[n-2].",
    "algo": "a, b = 1, 1. For _ in range(n - 1): a, b = b, a + b. Return b.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Base cases n=1 and n=2."
  },
  {
    "id": 210,
    "title": "Min Cost Climbing Stairs",
    "lc": 746,
    "slug": "min-cost-climbing-stairs",
    "url": "https://leetcode.com/problems/min-cost-climbing-stairs/",
    "diff": "Easy",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Linear Cost Minimization",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Cost to reach top floor.",
    "algo": "a, b = cost[0], cost[1]. For i in 2..n-1: a, b = b, cost[i] + min(a, b). Return min(a, b).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "The top of floor is past the last index."
  },
  {
    "id": 211,
    "title": "House Robber",
    "lc": 198,
    "slug": "house-robber",
    "url": "https://leetcode.com/problems/house-robber/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Rob / Skip State Machine",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft"
    ],
    "mental": "Cannot rob two adjacent houses. For house i: rob i (nums[i] + prev2) OR skip i (prev1).",
    "algo": "prev2, prev1 = 0, 0. For x in nums: prev2, prev1 = prev1, max(prev1, prev2 + x). Return prev1.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Only 2 previous states needed; reduces space from O(N) to O(1)."
  },
  {
    "id": 212,
    "title": "House Robber II",
    "lc": 213,
    "slug": "house-robber-ii",
    "url": "https://leetcode.com/problems/house-robber-ii/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Circular Array Decomposition",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Houses are in a circle. You cannot rob both first and last house. Run House Robber I on nums[1:] and nums[:-1]. Take max.",
    "algo": "if len(nums) == 1: return nums[0]. Return max(rob_linear(nums[1:]), rob_linear(nums[:-1])).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Single house edge case len(nums) == 1."
  },
  {
    "id": 213,
    "title": "Decode Ways",
    "lc": 91,
    "slug": "decode-ways",
    "url": "https://leetcode.com/problems/decode-ways/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Linear Parsing Decisions",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Single digit decode if s[i] != '0'. Two digit decode if 10 <= int(s[i-1:i+1]) <= 26.",
    "algo": "dp = [0]*(n+1); dp[0] = 1; dp[1] = 1 if s[0] != '0' else 0. For i in 2..n: if s[i-1] != '0': dp[i] += dp[i-1]; if 10 <= int(s[i-2:i]) <= 26: dp[i] += dp[i-2]. Return dp[n].",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Leading zeros '06' cannot be decoded. '0' can only decode as part of '10' or '20'."
  },
  {
    "id": 214,
    "title": "Coin Change",
    "lc": 322,
    "slug": "coin-change",
    "url": "https://leetcode.com/problems/coin-change/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Unbounded Knapsack Minimization",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft"
    ],
    "mental": "dp[a] = fewest coins to make amount a. dp[a] = min(dp[a - coin] + 1 for coin in coins).",
    "algo": "dp = [inf] * (amount + 1); dp[0] = 0. For a in 1..amount: for c in coins: if a >= c: dp[a] = min(dp[a], dp[a - c] + 1). Return dp[amount] if dp[amount] != inf else -1.",
    "tc": "O(Amount * N)",
    "sc": "O(Amount)",
    "trap": "Initialize dp with infinity, dp[0] with 0."
  },
  {
    "id": 215,
    "title": "Maximum Product Subarray",
    "lc": 152,
    "slug": "maximum-product-subarray",
    "url": "https://leetcode.com/problems/maximum-product-subarray/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Min & Max Product Pair",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Multiplying by negative flips min and max.",
    "algo": "Track cur_max and cur_min.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Zeroes in array."
  },
  {
    "id": 216,
    "title": "Word Break",
    "lc": 139,
    "slug": "word-break",
    "url": "https://leetcode.com/problems/word-break/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "String Partitioning DP",
    "companies": [
      "Amazon",
      "Meta",
      "Google",
      "Microsoft",
      "Bloomberg"
    ],
    "mental": "dp[i] is True if s[:i] can be segmented into dictionary words. dp[i] = any(dp[j] and s[j:i] in dict for j in 0..i-1).",
    "algo": "dp = [False] * (n + 1); dp[0] = True. words = set(wordDict). For i in 1..n: for j in 0..i-1: if dp[j] and s[j:i] in words: dp[i] = True; break. Return dp[n].",
    "tc": "O(N^2 * L)",
    "sc": "O(N)",
    "trap": "Prune inner loop by only checking lengths up to max_word_len in dict."
  },
  {
    "id": 217,
    "title": "Longest Increasing Subsequence",
    "lc": 300,
    "slug": "longest-increasing-subsequence",
    "url": "https://leetcode.com/problems/longest-increasing-subsequence/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "Patience Sorting / Binary Search",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft",
      "Meta"
    ],
    "mental": "Tails array stores smallest tail of all increasing subsequences of length i + 1. Binary search insertion point.",
    "algo": "tails = []. For x in nums: idx = bisect_left(tails, x); if idx == len(tails): tails.append(x); else: tails[idx] = x. Return len(tails).",
    "tc": "O(N log N)",
    "sc": "O(N)",
    "trap": "Classic DP is O(N^2); patience sorting with bisect_left achieves O(N log N)."
  },
  {
    "id": 218,
    "title": "Partition Equal Subset Sum",
    "lc": 416,
    "slug": "partition-equal-subset-sum",
    "url": "https://leetcode.com/problems/partition-equal-subset-sum/",
    "diff": "Medium",
    "topic": "Dynamic Programming (1D)",
    "pattern": "0/1 Knapsack Target Sum",
    "companies": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "mental": "Equal partition means finding subset summing to sum(nums) // 2. Impossible if sum is odd.",
    "algo": "total = sum(nums); if total % 2 != 0: return False; target = total // 2. dp = {0}. For x in nums: dp |= {s + x for s in dp if s + x <= target}; if target in dp: return True. Return False.",
    "tc": "O(N * Target)",
    "sc": "O(Target)",
    "trap": "Bitset representation `dp |= (dp << num)` achieves extreme speed."
  },
  {
    "id": 219,
    "title": "Unique Paths",
    "lc": 62,
    "slug": "unique-paths",
    "url": "https://leetcode.com/problems/unique-paths/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "Grid Combinatorics / 2D DP",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "mental": "dp[r][c] = dp[r-1][c] + dp[r][c-1]. Top and left edge are all 1.",
    "algo": "row = [1] * n. For _ in range(m - 1): for c in 1..n-1: row[c] += row[c - 1]. Return row[-1].",
    "tc": "O(M * N)",
    "sc": "O(N)",
    "trap": "Combinatorial formula: (m + n - 2)! / ((m - 1)! * (n - 1)!)."
  },
  {
    "id": 220,
    "title": "Unique Paths II",
    "lc": 63,
    "slug": "unique-paths-ii",
    "url": "https://leetcode.com/problems/unique-paths-ii/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "Grid DP with Obstacles",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "If cell has obstacle (grid[r][c] == 1), dp[r][c] = 0. Else dp[r][c] = dp[r-1][c] + dp[r][c-1].",
    "algo": "dp = [0] * n; dp[0] = 1 if obstacleGrid[0][0] == 0 else 0. For r in range(m): for c in range(n): if obstacleGrid[r][c] == 1: dp[c] = 0; elif c > 0: dp[c] += dp[c-1]. Return dp[-1].",
    "tc": "O(M * N)",
    "sc": "O(N)",
    "trap": "Starting cell or ending cell contains obstacle; return 0."
  },
  {
    "id": 221,
    "title": "Minimum Path Sum",
    "lc": 64,
    "slug": "minimum-path-sum",
    "url": "https://leetcode.com/problems/minimum-path-sum/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "Grid Cost Minimization",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]).",
    "algo": "In-place or 1D array: dp[c] = grid[r][c] + min(dp[c], dp[c-1]).",
    "tc": "O(M * N)",
    "sc": "O(N)",
    "trap": "First row and first col can only come from one direction."
  },
  {
    "id": 222,
    "title": "Longest Common Subsequence",
    "lc": 1143,
    "slug": "longest-common-subsequence",
    "url": "https://leetcode.com/problems/longest-common-subsequence/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "2D String Alignment Matrix",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "mental": "If text1[i] == text2[j], dp[i][j] = 1 + dp[i-1][j-1]. Else dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
    "algo": "dp = [[0]*(n+1) for _ in range(m+1)]. For i in 1..m: for j in 1..n: if text1[i-1] == text2[j-1]: dp[i][j] = 1 + dp[i-1][j-1]; else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]). Return dp[m][n].",
    "tc": "O(M * N)",
    "sc": "O(min(M, N))",
    "trap": "Subsequence (not substring) allows non-contiguous matching."
  },
  {
    "id": 223,
    "title": "Edit Distance",
    "lc": 72,
    "slug": "edit-distance",
    "url": "https://leetcode.com/problems/edit-distance/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "Levenshtein Distance Matrix",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Insert: dp[i][j-1] + 1. Delete: dp[i-1][j] + 1. Replace: dp[i-1][j-1] + 1 (or 0 if characters match).",
    "algo": "dp = [[0]*(n+1) for _ in range(m+1)]. Base cases dp[i][0] = i, dp[0][j] = j. If word1[i-1] == word2[j-1]: dp[i][j] = dp[i-1][j-1]; else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).",
    "tc": "O(M * N)",
    "sc": "O(min(M, N))",
    "trap": "Off-by-one indexing with 1-based DP table."
  },
  {
    "id": 224,
    "title": "Longest Palindromic Subsequence",
    "lc": 516,
    "slug": "longest-palindromic-subsequence",
    "url": "https://leetcode.com/problems/longest-palindromic-subsequence/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "LCS with Reversed String / Interval DP",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "LPS of s equals the Longest Common Subsequence of s and reverse(s).",
    "algo": "Return LCS(s, s[::-1]). Or interval DP: if s[i] == s[j]: dp[i][j] = 2 + dp[i+1][j-1]; else max(dp[i+1][j], dp[i][j-1]).",
    "tc": "O(N^2)",
    "sc": "O(N)",
    "trap": "Subsequence vs substring distinction."
  },
  {
    "id": 225,
    "title": "Coin Change II",
    "lc": 518,
    "slug": "coin-change-ii",
    "url": "https://leetcode.com/problems/coin-change-ii/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "Unbounded Knapsack Combinations",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Count ways to make amount. Outer loop over coins, inner loop over amounts (avoids duplicate permutations).",
    "algo": "dp = [0] * (amount + 1); dp[0] = 1. For c in coins: for a in c..amount: dp[a] += dp[a - c]. Return dp[amount].",
    "tc": "O(N * Amount)",
    "sc": "O(Amount)",
    "trap": "Coins loop outside prevents counting [1, 2] and [2, 1] as distinct combinations."
  },
  {
    "id": 226,
    "title": "Interleaving String",
    "lc": 97,
    "slug": "interleaving-string",
    "url": "https://leetcode.com/problems/interleaving-string/",
    "diff": "Medium",
    "topic": "Dynamic Programming (2D)",
    "pattern": "2D String Transition Grid",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "s3[i+j-1] must match either s1[i-1] (coming from top) or s2[j-1] (coming from left).",
    "algo": "If len(s1) + len(s2) != len(s3): return False. dp[j] boolean for column. dp[j] = (dp[j] and s1[i-1] == s3[i+j-1]) or (dp[j-1] and s2[j-1] == s3[i+j-1]).",
    "tc": "O(M * N)",
    "sc": "O(N)",
    "trap": "Length check upfront: len(s1) + len(s2) == len(s3)."
  },
  {
    "id": 227,
    "title": "Distinct Subsequences",
    "lc": 115,
    "slug": "distinct-subsequences",
    "url": "https://leetcode.com/problems/distinct-subsequences/",
    "diff": "Hard",
    "topic": "Dynamic Programming (2D)",
    "pattern": "2D Subsequence Matching Counts",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "dp[i][j] = number of distinct subsequences of s[:i] matching t[:j]. If s[i-1] == t[j-1]: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]; else dp[i-1][j].",
    "algo": "dp = [1] + [0] * n. For c in s: for j in range(n, 0, -1): if c == t[j-1]: dp[j] += dp[j-1]. Return dp[n].",
    "tc": "O(M * N)",
    "sc": "O(N)",
    "trap": "Reverse inner loop when rolling 1D array to avoid using updated values from same step."
  },
  {
    "id": 228,
    "title": "Regular Expression Matching",
    "lc": 10,
    "slug": "regular-expression-matching",
    "url": "https://leetcode.com/problems/regular-expression-matching/",
    "diff": "Hard",
    "topic": "Dynamic Programming (2D)",
    "pattern": "Regex State Machine 2D DP",
    "companies": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "mental": "'.' matches any char. '*' matches 0 or more of preceding element: match 0 times (dp[i][j-2]) or match 1+ times (dp[i-1][j] if char matches).",
    "algo": "dp[0][0] = True. Initialize empty string matches with patterns like 'a*b*'. Transition based on '.' and '*'.",
    "tc": "O(M * N)",
    "sc": "O(M * N)",
    "trap": "'*' requires looking back 2 columns in pattern."
  },
  {
    "id": 229,
    "title": "Best Time to Buy and Sell Stock with Cooldown",
    "lc": 309,
    "slug": "best-time-to-buy-and-sell-stock-with-cooldown",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
    "diff": "Medium",
    "topic": "Dynamic Programming (Advanced)",
    "pattern": "State Machine (Hold, Sold, Rest)",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "Three states: Hold (bought stock), Sold (just sold, entering cooldown), Rest (can buy).",
    "algo": "hold = -inf, sold = 0, rest = 0. For p in prices: prev_sold = sold; sold = hold + p; hold = max(hold, rest - p); rest = max(rest, prev_sold). Return max(sold, rest).",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Must cooldown for 1 day after selling before buying again."
  },
  {
    "id": 230,
    "title": "Best Time to Buy and Sell Stock IV",
    "lc": 188,
    "slug": "best-time-to-buy-and-sell-stock-iv",
    "url": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/",
    "diff": "Hard",
    "topic": "Dynamic Programming (Advanced)",
    "pattern": "K Transactions State Arrays",
    "companies": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "mental": "At most k transactions. Track buy[j] and sell[j] for j in 1..k.",
    "algo": "If k >= n // 2: solve like unlimited transactions. Else: buy = [-inf]*(k+1), sell = [0]*(k+1). For p in prices: for j in 1..k: buy[j] = max(buy[j], sell[j-1] - p); sell[j] = max(sell[j], buy[j] + p). Return sell[k].",
    "tc": "O(N * K)",
    "sc": "O(K)",
    "trap": "k >= n // 2 shortcut prevents allocating massive O(N * K) tables when k is huge."
  },
  {
    "id": 231,
    "title": "Burst Balloons",
    "lc": 312,
    "slug": "burst-balloons",
    "url": "https://leetcode.com/problems/burst-balloons/",
    "diff": "Hard",
    "topic": "Dynamic Programming (Advanced)",
    "pattern": "Reverse Interval DP",
    "companies": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "mental": "Think in reverse: instead of which balloon bursts first, consider which balloon bursts LAST in range [i, j].",
    "algo": "Add 1s to both ends: nums = [1] + nums + [1]. dp[i][j] = max(dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j] for k in i+1..j-1).",
    "tc": "O(N^3)",
    "sc": "O(N^2)",
    "trap": "Forward thinking causes subproblems to depend on outer balloons; reverse thinking decouples left and right subproblems."
  },
  {
    "id": 232,
    "title": "Palindrome Partitioning II",
    "lc": 132,
    "slug": "palindrome-partitioning-ii",
    "url": "https://leetcode.com/problems/palindrome-partitioning-ii/",
    "diff": "Hard",
    "topic": "Dynamic Programming (Advanced)",
    "pattern": "Precomputed Palindromes + 1D DP",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "dp[i] = minimum cuts for s[:i+1]. For all j <= i where s[j:i+1] is palindrome: dp[i] = min(dp[i], dp[j-1] + 1).",
    "algo": "Expand around all centers to find palindromes. Update dp cuts array directly.",
    "tc": "O(N^2)",
    "sc": "O(N)",
    "trap": "Precomputing palindromes or expanding centers avoids O(N^3)."
  },
  {
    "id": 233,
    "title": "Maximal Rectangle",
    "lc": 85,
    "slug": "maximal-rectangle",
    "url": "https://leetcode.com/problems/maximal-rectangle/",
    "diff": "Hard",
    "topic": "Dynamic Programming (Advanced)",
    "pattern": "Histogram DP on 2D Matrix",
    "companies": [
      "Google",
      "Amazon",
      "Apple"
    ],
    "mental": "Each row represents the base of a histogram. Running count of consecutive 1s gives heights. Run Largest Rectangle in Histogram on each row.",
    "algo": "heights = [0] * cols. max_area = 0. For row in matrix: for c in range(cols): heights[c] = heights[c] + 1 if row[c] == '1' else 0; max_area = max(max_area, largestRectangleArea(heights)). Return max_area.",
    "tc": "O(R * C)",
    "sc": "O(C)",
    "trap": "Reset height to 0 when row[c] == '0'."
  },
  {
    "id": 234,
    "title": "Single Number",
    "lc": 136,
    "slug": "single-number",
    "url": "https://leetcode.com/problems/single-number/",
    "diff": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "Bitwise XOR Cancellation",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Apple"
    ],
    "mental": "x ^ x = 0 and x ^ 0 = x. XOR-ing all numbers cancels out pairs, leaving the single number.",
    "algo": "res = 0; for x in nums: res ^= x; return res.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Only works when all other elements appear exactly twice."
  },
  {
    "id": 235,
    "title": "Number of 1 Bits",
    "lc": 191,
    "slug": "number-of-1-bits",
    "url": "https://leetcode.com/problems/number-of-1-bits/",
    "diff": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "Brian Kernighan's Algorithm",
    "companies": [
      "Microsoft",
      "Amazon",
      "Apple"
    ],
    "mental": "n & (n - 1) flips the lowest set bit to 0. Count how many times this operation runs until n reaches 0.",
    "algo": "count = 0; while n: n &= (n - 1); count += 1; return count.",
    "tc": "O(Set Bits)",
    "sc": "O(1)",
    "trap": "Only loops through actual set bits rather than all 32 bits."
  },
  {
    "id": 236,
    "title": "Counting Bits",
    "lc": 338,
    "slug": "counting-bits",
    "url": "https://leetcode.com/problems/counting-bits/",
    "diff": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "DP Bit Recurrence",
    "companies": [
      "Amazon",
      "Google"
    ],
    "mental": "ans[i] = ans[i >> 1] + (i & 1). Number of bits in i equals bits in i // 2 plus last bit.",
    "algo": "ans = [0] * (n + 1). For i in 1..n: ans[i] = ans[i >> 1] + (i & 1). Return ans.",
    "tc": "O(N)",
    "sc": "O(N)",
    "trap": "Linear O(N) single pass without calling bit count function."
  },
  {
    "id": 237,
    "title": "Reverse Bits",
    "lc": 190,
    "slug": "reverse-bits",
    "url": "https://leetcode.com/problems/reverse-bits/",
    "diff": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "Bit Shift Accumulation",
    "companies": [
      "Apple",
      "Amazon"
    ],
    "mental": "Extract LSB with n & 1, shift into result res = (res << 1) | (n & 1), right shift n.",
    "algo": "res = 0; for _ in range(32): res = (res << 1) | (n & 1); n >>= 1; return res.",
    "tc": "O(1)",
    "sc": "O(1)",
    "trap": "Must loop exactly 32 times to handle leading zeros correctly."
  },
  {
    "id": 238,
    "title": "Missing Number",
    "lc": 268,
    "slug": "missing-number",
    "url": "https://leetcode.com/problems/missing-number/",
    "diff": "Easy",
    "topic": "Bit Manipulation",
    "pattern": "Bitwise XOR",
    "companies": [
      "Amazon",
      "Microsoft"
    ],
    "mental": "XOR all numbers 0..n and all array values.",
    "algo": "res = n; for i, x in enumerate(nums): res ^= i ^ x; return res.",
    "tc": "O(N)",
    "sc": "O(1)",
    "trap": "Zero overflow risk compared to sum arithmetic."
  },
  {
    "id": 239,
    "title": "Sum of Two Integers",
    "lc": 371,
    "slug": "sum-of-two-integers",
    "url": "https://leetcode.com/problems/sum-of-two-integers/",
    "diff": "Medium",
    "topic": "Bit Manipulation",
    "pattern": "Half-Adder Logic (XOR & AND)",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "XOR a ^ b computes sum without carry. AND (a & b) << 1 computes carry. Repeat until carry is 0.",
    "algo": "mask = 0xFFFFFFFF. While b & mask != 0: carry = (a & b) << 1; a = a ^ b; b = carry. Return a if a <= 0x7FFFFFFF else ~(a ^ mask).",
    "tc": "O(1)",
    "sc": "O(1)",
    "trap": "Python's arbitrary-precision integers require masking with 0xFFFFFFFF to simulate 32-bit overflow."
  },
  {
    "id": 240,
    "title": "Subsets",
    "lc": 78,
    "slug": "subsets",
    "url": "https://leetcode.com/problems/subsets/",
    "diff": "Medium",
    "topic": "Bit Manipulation",
    "pattern": "Bitmask Representation",
    "companies": [
      "Meta",
      "Amazon"
    ],
    "mental": "Numbers 0 to 2^n - 1 represent all subsets. If j-th bit of i is set, include nums[j].",
    "algo": "res = []; for i in range(1 << n): res.append([nums[j] for j in range(n) if (i >> j) & 1]). Return res.",
    "tc": "O(2^N * N)",
    "sc": "O(N)",
    "trap": "Clean alternative to recursion."
  },
  {
    "id": 241,
    "title": "Maximum XOR of Two Numbers in an Array",
    "lc": 421,
    "slug": "maximum-xor-of-two-numbers-in-an-array",
    "url": "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
    "diff": "Medium",
    "topic": "Bit Manipulation",
    "pattern": "Bitmask Prefix Set / Trie",
    "companies": [
      "Google"
    ],
    "mental": "Build max XOR bit by bit from MSB to LSB. Check if any two prefixes XOR to candidate.",
    "algo": "Binary Trie or prefix set.",
    "tc": "O(32 * N)",
    "sc": "O(N)",
    "trap": "Bit mask evaluation."
  },
  {
    "id": 242,
    "title": "LRU Cache",
    "lc": 146,
    "slug": "lru-cache",
    "url": "https://leetcode.com/problems/lru-cache/",
    "diff": "Medium",
    "topic": "System & Data Structure Design",
    "pattern": "Hash Map + Doubly Linked List",
    "companies": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft",
      "Apple",
      "Uber",
      "Bloomberg"
    ],
    "mental": "Hash map gives O(1) key-to-node lookup. Doubly linked list maintains LRU ordering with O(1) node removal and addition to head.",
    "algo": "get(key): if key not in map return -1; node = map[key]; move_to_head(node); return node.val. put(key, val): if key exists: update and move to head; else: create node, add to head, if size > cap: evict tail node and delete from map.",
    "tc": "O(1) all ops",
    "sc": "O(Capacity)",
    "trap": "Remember dummy head and dummy tail nodes simplify edge removals immensely."
  },
  {
    "id": 243,
    "title": "LFU Cache",
    "lc": 460,
    "slug": "lfu-cache",
    "url": "https://leetcode.com/problems/lfu-cache/",
    "diff": "Hard",
    "topic": "System & Data Structure Design",
    "pattern": "Hash Map + Frequency DLLs",
    "companies": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "mental": "Map key -> node. Map freq -> DoublyLinkedList of nodes. Maintain min_freq counter.",
    "algo": "When node accessed, increment its freq, move to new freq list. If old freq list empty and was min_freq, min_freq += 1. On eviction, remove tail from min_freq list.",
    "tc": "O(1) all ops",
    "sc": "O(Capacity)",
    "trap": "Ties in frequency are broken by LRU order (evict least recently used among least frequently used)."
  },
  {
    "id": 244,
    "title": "Insert Delete GetRandom O(1)",
    "lc": 380,
    "slug": "insert-delete-getrandom-o1",
    "url": "https://leetcode.com/problems/insert-delete-getrandom-o1/",
    "diff": "Medium",
    "topic": "System & Data Structure Design",
    "pattern": "Dynamic Array + Index Map",
    "companies": [
      "Meta",
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "mental": "Array provides O(1) random access via random.choice. Hash map stores val -> array index. To delete in O(1): swap target element with last element, pop from array, update map.",
    "algo": "insert(val): if val in map: return False; map[val] = len(nums); nums.append(val); return True. remove(val): if val not in map: return False; idx = map[val]; last = nums[-1]; nums[idx] = last; map[last] = idx; nums.pop(); del map[val]; return True.",
    "tc": "O(1) all ops",
    "sc": "O(N)",
    "trap": "Swapping with last element allows O(1) pop without shifting array."
  },
  {
    "id": 245,
    "title": "Time Based Key-Value Store",
    "lc": 981,
    "slug": "time-based-key-value-store",
    "url": "https://leetcode.com/problems/time-based-key-value-store/",
    "diff": "Medium",
    "topic": "System & Data Structure Design",
    "pattern": "Hash Map + Binary Search Array",
    "companies": [
      "Google",
      "Netflix",
      "Amazon"
    ],
    "mental": "Map key to array of (timestamp, value). Since timestamps are strictly increasing, use binary search for get.",
    "algo": "set(key, val, time): map[key].append((time, val)). get(key, time): binary search for rightmost entry with timestamp <= time.",
    "tc": "O(log N) get, O(1) set",
    "sc": "O(N)",
    "trap": "Return empty string '' if all timestamps for key are greater than requested time."
  },
  {
    "id": 246,
    "title": "Design Twitter",
    "lc": 355,
    "slug": "design-twitter",
    "url": "https://leetcode.com/problems/design-twitter/",
    "diff": "Medium",
    "topic": "System & Data Structure Design",
    "pattern": "Hash Map + Min/Max Heap Merge",
    "companies": [
      "Twitter",
      "Amazon"
    ],
    "mental": "Map user -> followees set. Map user -> list of (timestamp, tweetId). Feed merges most recent tweets across all followees using min/max heap.",
    "algo": "getNewsFeed(userId): collect recent 10 tweets from user and all followees. Merge using heap of size 10.",
    "tc": "O(K log K) feed",
    "sc": "O(Users + Tweets)",
    "trap": "User automatically sees their own tweets in news feed."
  },
  {
    "id": 247,
    "title": "Design Search Autocomplete System",
    "lc": 642,
    "slug": "design-search-autocomplete-system",
    "url": "https://leetcode.com/problems/design-search-autocomplete-system/",
    "diff": "Hard",
    "topic": "System & Data Structure Design",
    "pattern": "Trie + Min-Heap / Top-3 Cache",
    "companies": [
      "Google",
      "Amazon"
    ],
    "mental": "Trie node stores sentence frequencies or top-3 suggestions. Interactive character input updates search pointer.",
    "algo": "Each Trie node maintains top-3 hot sentences sorted by frequency descending then ASCII ascending. '#' ends input and updates frequency.",
    "tc": "O(P + 3 log 3)",
    "sc": "O(Total Sentences)",
  }
];

if (typeof window !== 'undefined') {
  window.DSA_TOPICS_DATA = DSA_TOPICS_DATA;
  window.DSA_PROBLEMS_LIST = DSA_PROBLEMS_LIST;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DSA_TOPICS_DATA, DSA_PROBLEMS_LIST };
}
