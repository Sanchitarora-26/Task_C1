
const galleryImages = [
  { src: '/images/IMG_9176.jpg', alt: 'Gallery image 1' },
  { src: '/images/IMG_9178.JPG', alt: 'Gallery image 2' },
  { src: '/images/IMG_9187.JPG', alt: 'Gallery image 3' },
  { src: '/images/IMG_9232.JPG', alt: 'Gallery image 4' },
  { src: '/images/IMG_9233.JPG', alt: 'Gallery image 5' },
  { src: '/images/IMG_9461.jpg', alt: 'Gallery image 6' }
];

function Portfolio() {
  return (
    <>
      <section className="hero" id="top">
        <img
          src="/images/IMG_8875.jpg"
          alt="My Gurudev"
        />

        <div className="hero-text">
          <p className="eyebrow">DEV@Deakin / Chitkara</p>
          <h1>Radhe Radhe , I'm Sanchit Arora</h1>
          <p>Radhe Radhe Shree Kunj Bihari Shree Haridas </p>
        </div>
      </section>

      <section className="about" id="about">
        <img
          className="profile"
          src="/images/IMG_8674.jpg"
          alt="Sanchit Arora"
        />

        <div>
          <p className="eyebrow">ABOUT ME</p>
          <h2>Sanchit Arora</h2>

          <p>
            I have a special interest in Vrindavan, a beautiful
            spiritual place known for its connection with Lord
            Krishna. I feel inspired by its peaceful atmosphere,
            beautiful temples, devotional traditions and rich
            culture. I enjoy learning about the spiritual history
            of Vrindavan and exploring the teachings of Lord
            Krishna, which encourage love, kindness and positivity
            in life.
          </p>
        </div>
      </section>

      <section className="gallery-section">
        <p className="eyebrow">MEDIA</p>
        <h2>Gallery</h2>

        <div className="gallery">
          {galleryImages.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="eyebrow">GET IN TOUCH</p>
        <h2>Contact</h2>

        <p>
          <a href="mailto:sanchit9085.ai25@chitkara.edu.in">
            sanchit9085.ai25@chitkara.edu.in
          </a>
        </p>
      </section>
    </>
  );
}

export default Portfolio;
