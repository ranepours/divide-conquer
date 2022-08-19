// return num of zeros in arr
const countZeroes = (arr, target = 0, left = 0, right = arr.length -1) => {
    //ideas => traverse array normally and check for first instance of zero lol
    // scan array - if midVal is 0 on first try check LEFT for first occurrence of 1 and return that idx?
    // given that index subtract from arr length
    // return the result
    let idx = -1; //initialize a default for 0 not being found in arr - will be updated if occurrence found

    while(left <= right){ //loop until all options exhausted
        let mid = Math.floor((left + right) / 2);
        if (target === arr[mid]){ //if idx found with a value of 0, update idx and search the left side
            idx = mid;
            right = mid - 1;
        } else if (target > arr[mid]){
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    } 
    //if idx != -1 then arr.length - idx else return 0 bc there are none present
    if(idx != -1){
        return arr.length - idx;
    } return 0;
}
console.log(countZeroes([1,1,1,1,0,0]));
console.log(countZeroes([1,0,0,0,0]))
console.log(countZeroes([0,0,0]));
console.log(countZeroes([1,1,1,1]));

// return num of occurrences of val in arr
const sortedFrequency = (arr,val) => {
    //search for first occurrence of val and store it
        // => IF NOT FOUND STORE -1
    //search for last occurrence of val and store that as well
    //if val in sorted count the indices between first and last including them, lastIdx - firstIdx + 1 (to shift arr)
        // => else return -1 bc not found
    let firstIdx = first(arr, val);
    if (firstIdx == -1) return firstIdx;
    let lastIdx = last(arr, val);
    return lastIdx - firstIdx + 1;
}
const first = (arr, val, left = 0, right = arr.length - 1) => {
    if (right >= left){
        let mid = Math.floor((left + right) / 2);
        if ((mid === 0 || val > arr[mid - 1]) && arr[mid] === val){
            return mid;
        } else if (val > arr[mid]){
            return first(arr, val, mid + 1, right);
        } else {
            return first(arr, val, left, mid - 1);
        }
    } return -1;
}
const last = (arr, val, left = 0, right = arr.length - 1) => {
    if (right >= left) {
        let mid = Math.floor((left + right) / 2);
        if ((mid === arr.length - 1 || val < arr[mid + 1]) && arr[mid] === val){
            return mid;
        } else if (val < arr[mid]) {
            return last(arr, val, left, mid - 1);
        } else {
            return last(arr, val, mid + 1, right);
        }
    } return -1;
}
console.log(sortedFrequency([1,1,2,2,2,2,3], 2));
console.log(sortedFrequency([1,1,2,2,2,2,3], 3));
console.log(sortedFrequency([1,1,2,2,2,2,3], 1));
console.log(sortedFrequency([1,1,2,2,2,2,3], 4));

//return idx of num where arr has been rotated => this one made me feel bad about myself :D
const findRotatedIndex = (array, val) => {
    let pivot = findPivot(array)
    if (pivot > 0 && val >= array[0] && val <= array[pivot - 1]){
        return binarySearch(array, val, 0, pivot - 1);
    } else {
        return binarySearch(array, val, pivot, array.length - 1);
    }
}
const binarySearch = (array, val, left, right) => {
    if (array.length === 0) return -1;
    if (val < array[left] || val > array[right]) return -1;
  
    while (left <= right){
        var mid = Math.floor((left + right) / 2);
        if (array[mid] === val){
            return mid;
        } else if (val < array[mid]){
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    } return -1;
}
const findPivot = (arr, left = 0, right = arr.length - 1) => {
    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;

    while (left <= right){
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] > arr[mid + 1]) return mid + 1
        else if (arr[left] <= arr[mid]){
            left = mid + 1
        } else {
         right = mid - 1;
        }
    }
}
console.log(findRotatedIndex([3,4,1,2], 4))
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8))
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3))
console.log(findRotatedIndex([37, 44, 66, 102, 10, 22], 14))
console.log(findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12))

// given a sorted array in incr order, return num of times array's values have been shifted/rotated
const findRotationCount = (arr, left = 0, right = arr.length - 1) => {
    if (left < right) return 0;
    if (left === right) return left;
    let mid = Math.floor((left+right)/2);
    //check if mid is the max val in arr
    if(mid < right && arr[mid+1] < arr[mid]) return mid +1;
    //if mid is minimum val in arr
    if(mid > left && arr[mid < arr[mid-1]]) return mid;
    //cut left or right
    if(arr[right] > arr[mid]){
        return findRotationCount(arr, left, mid -1);
    } return findRotationCount(arr, right, mid +1);
};

// accepts sorted and value; returns floor of the value => floor is largest element in array >= val; if no floor, return -1
const findFloor = (arr,val,left=0,right=arr.length -1) => {
    if(left > right) return -1;
    if(val >= arr[right]) return arr[right];

    let mid = Math.floor((left+right)/2);
    if(arr[mid] === val) return arr[mid];
    if(mid>0 && arr[mid-1] <= val && val < arr[mid]) return arr[mid -1];
    if(val<arr[mid]){
        return findFloor(arr, val, left, mid -1);
    } return findFloor(arr, val, right, mid +1)
};
console.log(findFloor([1,2,8,10,10,12,19], 9));
console.log(findFloor([1,2,8,10,10,12,19], 20));
console.log(findFloor([1,2,8,10,10,12,19], 0));