main();
function main(){
let q = 13, p = 11;
let n = q * p;
let z = (q-1) * (p-1);
let e, d, emsg, dmsg;

for (e = 2; e<z;e++){
    if(findE(e,z)==1){
        break;
    }
}
 d = findD(e,z);

console.log("Public Key (" + n + " , " + e + ")");
console.log("Private Key (" + n + " , " + d + ")");
console.log("     ");

let msg = "ENCRYPTION";
emsg = encryption(n,e, msg);
dmsg = decryption(n,d,emsg);

console.log("ORIGINAL TEXT:  " + msg);
console.log('ENCRYPTED TEXT:  ' + emsg);
console.log('DECRYPTED TEXT:  ' + dmsg);
console.log("     ");

msg = 'RASTAMAN';
emsg = encryption(n,e,msg);
dmsg = decryption(n,d,emsg);

console.log("ORIGINAL TEXT:  " + msg);
console.log('ENCRYPTED TEXT:  ' + emsg);
console.log('DECRYPTED TEXT:  ' + dmsg);
}

function findE(e,z){
    if (e==0){
        return z;
    }else{
        return findE(z%e,e);
    }
}

function findD(e,z){
    let d,i,j;
    for (i = 0; i<=9; i++){
        j = 1 + (i * z);
        if(j % e == 0){
            d = j /e;
            break;
        }
    }
    return d;
}

function encryption(n,e, msg){
    let i,m,str = '';
    
    const handleBigInverse = x => {
        const stringX = x.toString();
      
        if (stringX.length > 21) {
          const approximate = Number(stringX.slice(0, 21));
          const e = stringX.length - 21;
      
          const inverse = 1 / approximate;
          const inverseString = inverse.toString();
      
          const splitString = inverseString.split("e");
          splitString[1] = (Number(splitString[1]) - e).toString();
      
          return splitString.join("e");
        } else {
          const inverse = 1 / Number(x);
          return inverse.toString();
        }
      };

      const iterativeExpBySqWithMod = (x, n, mod) => {
        let bigX = BigInt(x);
        let bigN = BigInt(n);
      
        if (n < 0) {
          if (!mod || Math.abs(mod) >= 1) {
            return handleBigInverse(iterativeExpBySqWithMod(x, -n));
          } else {
            return (
              handleBigInverse(iterativeExpBySqWithMod(x, -n)) % mod
            ).toString();
          }
        }
        if (mod) {
          const bigMod = BigInt(mod);
          let result = BigInt(1);
      
          while (bigN > 0) {
            if (bigN % BigInt(2) == 1) {
              result = (result * bigX) % bigMod;
            }
            bigX = (bigX * bigX) % bigMod;
            bigN /= BigInt(2);
          }
          return result;
        } else {
          let result = BigInt(1);
          while (bigN > 0) {
            if (bigN % BigInt(2) == 1) {
              result *= bigX;
            }
            bigX *= bigX;
            bigN /= BigInt(2);
          }
          return result;
        }
      };

      for(i=0;i<msg.length;i++){
        m = iterativeExpBySqWithMod(msg.charCodeAt(i),e,n);
        str += String.fromCharCode(Number(m));
    }
    return str;
}

function decryption(n,d, msg){
    let i,c,str = '';
    const handleBigInverse = x => {
        const stringX = x.toString();
      
        if (stringX.length > 21) {
          const approximate = Number(stringX.slice(0, 21));
          const e = stringX.length - 21;
      
          const inverse = 1 / approximate;
          const inverseString = inverse.toString();
      
          const splitString = inverseString.split("e");
          splitString[1] = (Number(splitString[1]) - e).toString();
      
          return splitString.join("e");
        } else {
          const inverse = 1 / Number(x);
          return inverse.toString();
        }
      };

      const iterativeExpBySqWithMod = (x, n, mod) => {
        let bigX = BigInt(x);
        let bigN = BigInt(n);
      
        if (n < 0) {
          if (!mod || Math.abs(mod) >= 1) {
            return handleBigInverse(iterativeExpBySqWithMod(x, -n));
          } else {
            return (
              handleBigInverse(iterativeExpBySqWithMod(x, -n)) % mod
            ).toString();
          }
        }
        if (mod) {
          const bigMod = BigInt(mod);
          let result = BigInt(1);
      
          while (bigN > 0) {
            if (bigN % BigInt(2) == 1) {
              result = (result * bigX) % bigMod;
            }
            bigX = (bigX * bigX) % bigMod;
            bigN /= BigInt(2);
          }
          return result;
        } else {
          let result = BigInt(1);
          while (bigN > 0) {
            if (bigN % BigInt(2) == 1) {
              result *= bigX;
            }
            bigX *= bigX;
            bigN /= BigInt(2);
          }
          return result;
        }
      };

    for(i=0;i<msg.length;i++){
        c = iterativeExpBySqWithMod(msg.charCodeAt(i),d,n);
        str += String.fromCharCode(Number(c));
    }
    return str;
}