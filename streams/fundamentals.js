import { Readable, Writable, Transform, Duplex } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        this.push(`${i}\n`);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(transformed.toString()));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, endcoding, callback) {
    console.log(Number(chunk.toString() * 10));
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
