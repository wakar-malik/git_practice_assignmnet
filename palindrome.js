function checkPalindrome(str) {
  let newStr = "";

  for (let i = 1; i < str.length; i++) {
    newStr += str[i];
  }

  if (newStr === str) {
    console.log("Palindrome");
  } else {
    console.log("Not Palindrome");
  }
}

checkPalindrome("masai");
