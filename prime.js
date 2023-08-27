function checkPrime(num) {
  let count = 0;
  for (let i = 0; i <= num; i++) {
    count++;
  }

  if (count >= 2) {
    console.log("Prime");
  } else {
    console.log("Not Prime");
  }
}

checkPrime(10);
