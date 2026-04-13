import sharp from 'sharp';
import { statSync } from 'node:fs';

const jobs = [
  { src: 'D:/dominic/SnapInsta.to_631977605_18105713107751384_7173307759521548011_n.jpg', out: 'D:/dominic/demo-for-dominic/public/prueffuchs-creator-01.jpg', flip: false, gravity: 'north' },
  { src: 'D:/dominic/SnapInsta.to_655698898_18320619571264533_8811092516250733222_n.jpg', out: 'D:/dominic/demo-for-dominic/public/prueffuchs-creator-02.jpg', flip: false, gravity: 'north' },
  { src: 'D:/dominic/SnapInsta.to_662074646_18431582089186666_155935574333950666_n.jpg', out: 'D:/dominic/demo-for-dominic/public/prueffuchs-creator-03.jpg', flip: true,  gravity: 'north' },
];

async function process(job) {
  let pipeline = sharp(job.src, { failOnError: false }).rotate();
  if (job.flip) pipeline = pipeline.flop();
  const meta = await sharp(job.src).rotate().metadata();
  const size = Math.min(meta.width, meta.height);
  let top = 0;
  let left = Math.round((meta.width - size) / 2);
  if (job.gravity === 'north') top = 0;
  else if (job.gravity === 'center') top = Math.round((meta.height - size) / 2);
  await pipeline
    .extract({ left, top, width: size, height: size })
    .resize(400, 400)
    .jpeg({ quality: 85 })
    .toFile(job.out);
  const out = await sharp(job.out).metadata();
  const bytes = statSync(job.out).size;
  return { src: job.src, out: job.out, dims: `${out.width}x${out.height}`, kb: (bytes / 1024).toFixed(1), gravity: job.gravity, flipped: job.flip };
}

const results = [];
for (const j of jobs) results.push(await process(j));
console.log(JSON.stringify(results, null, 2));
