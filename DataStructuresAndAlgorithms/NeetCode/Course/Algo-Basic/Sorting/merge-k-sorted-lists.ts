// an application of mergeSort.ts and merge-linked-list-sorted-order

// This solution is timing out on LC BECAUSE I was not updating the list1 and list2 pointers correctly

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) {
      return null;
  }
  if (lists.length === 1) {
      return lists[0];
  }

  let middle = Math.floor(lists.length / 2);
  let leftHalf = lists.slice(0, middle);
  let rightHalf = lists.slice(middle, lists.length);

  let sortedLeft = mergeKLists(leftHalf);
  let sortedRight = mergeKLists(rightHalf);

  return mergeTwoLists(sortedLeft, sortedRight);
};

function mergeTwoLists(list1, list2) {
  let dummy = new ListNode();
  let current = dummy;

  while(list1 !== null && list2 !== null) {
      if (list1.val < list2.val) {
          current.next = list1;
          list1 = list1.next;
      } else {
          current.next = list2;
          list2 = list2.next;
      }

      current = current.next;
  }

  current.next = list1 !== null ? list1 : list2;

  return dummy.next;
}

// reduce slicing and recursion. Henced the lists would have to be
// merged iteratively.

// -> This is only slightly effecient than the above solution

// function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
//   if (lists.length === 0) return null;

//   while (lists.length > 1) {
//       let mergedLists: Array<ListNode | null> = [];

//       // Merge pairs of lists
//       for (let i = 0; i < lists.length; i += 2) {
//           let l1 = lists[i];
//           let l2 = (i + 1 < lists.length) ? lists[i + 1] : null;
//           mergedLists.push(mergeTwoLists(l1, l2));
//       }

//       // Replace the original list with the merged lists
//       lists = mergedLists;
//   }

//   return lists[0];
// }


