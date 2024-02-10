---
title: Leetcode-面试经典150题
date: 2024-01-01
tags:
  - Algorithm
---
# 26.删除有序数组中的重复项
给你一个 **非严格递增排列** 的数组 `nums` ，请你 **[原地](http://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 删除重复出现的元素，使每个元素 **只出现一次** ，返回删除后数组的新长度。元素的 **相对顺序** 应该保持 **一致** 。然后返回 `nums` 中唯一元素的个数。

考虑 `nums` 的唯一元素的数量为 `k` ，你需要做以下事情确保你的题解可以被通过：

- 更改数组 `nums` ，使 `nums` 的前 `k` 个元素包含唯一元素，并按照它们最初在 `nums` 中出现的顺序排列。`nums` 的其余元素与 `nums` 的大小不重要。
- 返回 `k` 。

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int n = nums.length;
        int k = 0; //新数组指针
        for (int next = 0; next < n; next++) {
            //不同则赋值
            if (nums[k] != nums[next]) {
                nums[++k] = nums[next];
            }
        }
        return k + 1; //实际长度
    }
}
```

# 80.删除有序数组中的重复项II

给你一个有序数组 `nums` ，请你 **[原地](http://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 删除重复出现的元素，使得出现次数超过两次的元素**只出现两次** ，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95) 修改输入数组** 并在使用 O(1) 额外空间的条件下完成。

## 双指针

```java
class Solution {
    public int removeDuplicates(int[] nums) {
        int n = nums.length;
        if (n <= 2) {
            return n;
        }
        int slow = 2, fast = 2;
        while (fast < n) {
            if (nums[slow - 2] != nums[fast]) {
                nums[slow] = nums[fast];
                ++slow;
            }
            ++fast;
        }
        return slow;
    }
}
```

# 169.多数元素

给定一个大小为 `n` 的数组 `nums` ，返回其中的多数元素。多数元素是指在数组中出现次数 **大于** `⌊ n/2 ⌋` 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

## 投机取巧版

```java
class Solution {
    public int majorityElement(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length / 2]; // >= n/2 中间必定如此
    }
}
```

## 投票
```java
class Solution {
    public int majorityElement(int[] nums) {
       int x=0,votes=0;
       for(int num:nums){ //增强for-each
           if(votes == 0){
               x = num;
           }
           votes += num==x ?1:-1;
        }
        return x;
    }
}
```

# [189. 轮转数组](https://leetcode.cn/problems/rotate-array/)
给定一个整数数组 `nums`，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是非负数。

**示例 1:**

**输入:** nums = [1,2,3,4,5,6,7], k = 3
**输出:** `[5,6,7,1,2,3,4]`
**解释:**
向右轮转 1 步: `[7,1,2,3,4,5,6]`
向右轮转 2 步: `[6,7,1,2,3,4,5]`
向右轮转 3 步: `[5,6,7,1,2,3,4]`

```java
class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;
        int[] arr = new int[n * 2]; //延长数组长度
        System.arraycopy(nums, 0, arr, 0, n); //源数组、源数组的起始位置、目标数组、目标数组的起始位置以及要复制的元素个数
        System.arraycopy(nums, 0, arr, n, n);
        System.arraycopy(arr, n - k, nums, 0, n); //取回
    }
}
```

# 121.买卖股票的最佳时机-贪心

给定一个数组 `prices` ，它的第 `i` 个元素 `prices[i]` 表示一支给定股票第 `i` 天的价格。
你只能选择 **某一天** 买入这只股票，并选择在 **未来的某一个不同的日子** 卖出该股票。设计一个算法来计算你所能获取的最大利润。
返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

```java
class Solution {
    public int maxProfit(int[] prices) {
        int cost = Integer.MAX_VALUE, profit = 0;
        for (int price : prices) {
            cost = Math.min(cost, price);
            profit = Math.max(profit, price - cost);
        }
        return profit;
    }
}
```

![图解](https://pic.leetcode-cn.com/1658590330-wivils-figures.gif)