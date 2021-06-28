const popular = [
  {
    id: 1,
    title: 'opal lamella',
    category: 'Pendant',
    img: 'https://dl.airtable.com/.attachments/7cc0f62cdaf7c6099d0d6d7f387947e8/fcb351cc/p.jpeg',
    price: 349,
    description:
      'The Opal Lamella pendant was designed in the 1950s by Danish light master Svend Aage Holm-Sørensen. Opal glass offers something special when it comes to light, and the internationally renowned light designer chose opal glass for the Opal Lamella pendant to create a special warm glow. The glowing glass core of the pendant is embraced by a sculptural metal crown, the luxurious look being further underpinned by the solid brass top. Wonderful indirect lighting when used as a single pendant in the kitchen, in the bedroom or a living-room nook, and equally elegant when three Opal Lamella pendants hover side by side over the dining table.',
  },
  {
    id: 2,
    title: 'cone',
    category: 'Pendant',
    img: 'https://dl.airtable.com/.attachments/24577712d20c09ef2b65e516d01d7b55/8ece4926/pendant.jpeg',
    price: 259,
    description:
      'A classic pendant with charm, finesse and an elegant, solid brass ring, designed in the 1950s by the internationally renowned lighting designer, Svend Aage Holm-Sørensen. The rigorous expression means that the Cone pendant can hang beautifully alone or as part of a group, above the dining table or kitchen worktop, or in a dark corner of the living room. In addition to direct lighting, Cone’s iconic light grooves along the edge of the metal shade provide an indirect graphic lighting effect, which lends character to the design.',
  },
  {
    id: 3,
    title: 'opal shade',
    category: 'Pendant',
    img: 'https://dl.airtable.com/.attachments/3f70f295b2a5ab0639f484dfbeb6ac19/7f1ebe64/pendatlamp.jpeg',
    price: 459,
    description:
      'Danish light master Svend Aage Holm-Sørensen has masterminded the Opal Shade pendant designed in the 1950s. Opal glass offers something special when it comes to light, and the internationally renowned light designer chose opal glass for the Opal Shade pendant to create a special warm glow. Combined with the grooves in the wide metal shade, this creates an exciting and elegant light effect. With its classic shape, sophisticated solid brass details and high quality craftsmanship, this pendant is a beautiful feature above the dining table or the kitchen table, in the hallway or in a nook where it will create life and attention. Choose between several classic colours in Warm Nordics exclusive silk matt colours for an extraordinarily beautiful and durable surface.',
  },
  {
    id: 4,
    title: 'Mr.Olsen',
    category: 'sofa',
    img: 'https://dl.airtable.com/.attachments/fecf1a02ec169e1afd7196560cd92033/2fe15dbc/sofa_blue.jpeg',
    price: 4199,
    description:
      'A classic, sophisticated designer sofa designed in the 1950s by the highly acclaimed Danish architect, Hans Olsen. The Mr Olsen sofa is an original design that is a perfect match for a gentleman’s room or a feminine sofa group, in a home office or a holiday cottage: anywhere that classic furniture design makes all the difference. Mr Olsen is both slender and organic with a lightness that is unusual by comparison with other design classics of the period. Mr Olsen’s special elegance derives particularly from the soft shapes of the sofa’s armrests and the round, tapered legs. The sofa is available both in a classic leather version and a fully upholstered version in beautiful fabrics, including sophisticated velour for a more daring look. Choose from several different exclusive furnishing fabrics from the likes of Kvadrat in a variety of classic colours from the Warm Nordic universe. The frame is available in the highest quality walnut oiled oak or smoked oak.',
  },
  {
    id: 5,
    title: 'dwell',
    category: 'sofa',
    img:
      'https://dl.airtable.com/.attachments/0bc72e49067f40eb9c423672ab894b14/e333daea/2101041-warmnordic-furniture-dwell-2-seater-cream-1700x1700px.jpeg',
    price: 3349,
    description:
      'A beautiful sofa classic, designed in the 50s by the architect Hans Olsen, who was one of the great Danish furniture designers of the era. The Dwell Sofa features an eternal 50s design with armrests in an organic design that invite you simply to remain - or ‘dwell’ - in the sofa. At the same time, the sleek, rounded solid wooden legs add to the overall impression of this light, accommodating piece of furniture. While the two-seater sofa is an elegant design element in any small flat, it is just as stylish as part of a bigger sofa group: for example, accompanied by the lounge chair in the same timeless',
  },
  {
    id: 6,
    title: 'cape',
    category: 'sofa',
    img:
      'https://dl.airtable.com/.attachments/3d50e655597f67b8cb18cef8e5769827/7008694d/2101009-warmnordic-furniture-cape-sofa-3seat-blush-1700x1700.jpeg',
    price: 3299,
    description:
      'An elegant sofa with an organic design designed by Charlotte Høncke. Its soft lines and chic details make the Cape sofa a natural focal point, preferably in the company of the armchair in the same range. Both items of furniture are available with or without visible stitching. The sofa looks just as elegant in a modern building as in an old-fashioned luxury flat and has a light look by virtue of its slender metal legs. To achieve aesthetic perfection the Cape range is covered with exclusive furnishing fabrics, including ‘Hero’, whose soft, almost felt-like surface complements the sofas organic shape, and which is designed by Patricia Urquiola.',
  },
  {
    id: 7,
    title: 'Gesture Chair',
    category: 'dining chair',
    img:
      'https://dl.airtable.com/.attachments/c38497376b02426ad286243505ae7e10/950e2b61/2405008-warmnordic-diningchairs-gesture-teak-stained-seat-peachy-pink-back-teak-stained-1700x1700.jpeg',
    price: 609,
    description:
      'This beautiful, moulded Gesture Chair, designed in the 1950s, was the work of the acclaimed Danish architect, Hans Olsen. With its welcoming design, the Gesture Chair creates a warm atmosphere around a dining table or at a desk in the living room, where it does not hurt if a chair is something special. The armrests invite you to sit down and relax in the moulded design and are also constructed so you cannot get too close to the table. Gesture is a designer chair with a certain weight, offset by its light, playful charm.',
  },
  {
    id: 8,
    title: 'Noble Chair',
    category: 'dining chair',
    img:
      'https://dl.airtable.com/.attachments/faf78a9dd51a695047a79fd6acecf6f3/897ba1f6/2405035-warmnordic-furniture-noble-diningchair-oiledoak-seat-graphic-sprinkles-01-1700x1700.jpeg',
    price: 609,
    description:
      'An elegant and noble designer chair created in the 1950s by the acclaimed furniture designer, Arne Hovmand-Olsen. The Noble dining chair is a classic beauty that transports the craftsmanship and aesthetics of Danish modernism into the contemporary dining room or sociable kitchen. Nobles high back and its distinctive details highlight the beautiful qualities of the wood. The seat of the chair is available in upholstery or leather',
  },
  {
    id: 9,
    title: 'Be My Guest',
    category: 'dining chair',
    img:
      'https://dl.airtable.com/.attachments/ad813b221a281b20d0a1a80acf79ca3c/a0ad2bb5/2605001-warmnordic-furniture-bemyguest-stool-cane1700x1700px.jpeg',
    price: 379,
    description:
      'An elegant stool with a french cane seat and simple metal frame, together creating a warm, sophisticated, floating look. The idea behind the Be My Guest stool is to provide an extra seat at the dining table without taking up too much room. Its French rattan and oak seat and simple black metal frame also make it a practical, yet beautiful piece of design. You can also use the stool as a unique side table, as an elegant addition to your living room or as a bedside table. With its classic design and touch of modern lightness',
  },
  {
    id: 10,
    title: 'From Above Table',
    category: 'Coffee table',
    img:
      'https://dl.airtable.com/.attachments/d63551dd07857ddfd14dca4cbc61e130/dffedec9/2807017-warmnordic-furniture-fromabove-coffeetable-steel-oceanblue-greyglass-72cm-1700x1700.jpeg',
    price: 329,
    description:
      'A light, elegant coffee table with a glass top and coloured steel frame. The transparent glass top of the From Above table sets off the structure beautifully, investing the coffee table with a handsome, graphic look. With its simple, yet powerful idiom, the From Above coffee table is an excellent complement to fabrics, rugs and Nordic woods, but would also make a great',
  },
  {
    id: 11,
    title: 'Secant',
    category: 'Coffee table',
    img:
      'https://dl.airtable.com/.attachments/a3e3da67c9285717cf214fca7b59e357/ef472701/2807006-warmnordic-furniture-secant-coffeetable-round-softrose-1700x1700.jpeg',
    price: 609,
    description:
      'Elegant coffee table that combines a sculptural metal frame with a coloured glass top, specially selected marble or Norwegian granite. Secant comes in two sizes and in a design that makes the table appear light and substantial at one and the same time. The special signature of the coffee table is its elegant finish where soft curves are contrasted by a straight line',
  },
  {
    id: 12,
    title: 'Herringbone Tile',
    category: 'Coffee table',
    img:
      'https://dl.airtable.com/.attachments/2e3e9a82a5038a19d9ca7e245d4ce96f/b3c6df64/2827002-warmnordic-furniture-herringbone-console-steel-blacknoir-tiles-forestgreen-01-1700x1700.jpeg',
    price: 1049,
    description:
      'xclusive console table with tiles in elegant herringbone pattern and coloured metal frame for a modern look. The design of the Herringbone table is inspired by the traditional tile-topped table and has been brought into the present with a focus on quality and craftsmanship.',
  },
  {
    id: 13,
    title: 'Daisy',
    category: 'Stool',
    img:
      'https://dl.airtable.com/.attachments/95ae473e138701d99e960610dedecdb8/d2cbe3a1/2816001-warmnordic-furniture-daisy-stool-forestgreen-01-1700x1700.jpeg',
    price: 195,
    description:
      'The Daisy stool will add a cute touch to your home and is wonderfully soft to sit on. Daisy is a fashionable stool with several features. The velour cushion has a leather strap, so the cushion is easy to take off and even carry round in your home. Without the cushion the stools light, powder-coated metal frame makes a perfect side table for a little tea party à deux or wine and snacks. Choose from several colour combinations',
  },

  {
    id: 14,
    title: 'Pebble',
    category: 'Stool',
    img:
      'https://dl.airtable.com/.attachments/1d458495a7573e2c9ae1017485cb99f2/a0098e0c/2505006-warmnordic-furniture-pebble-steel-white-seat-ash-h61-1700x1700.jpeg',
    price: 439,
    description:
      'Light stools and bar stools with organically shaped seats made of solid wood and with a strong attention to detail. With its well-conceived shape and wonderful finish, Pebble’s seat beckons you to touch it and is testament to a proud Scandinavian tradition of top-quality craftsmanship. Pebble comes in three heights so that they can be used for both a quick cup of coffee',
  },
  {
    id: 15,
    title: 'Be My Guest',
    category: 'Stool',
    img:
      'https://dl.airtable.com/.attachments/6884584f93782366dc842ca15dbe1753/7aefdf95/warmnordic-bemyguest-barstool-1700x1700.jpeg',
    price: 529,
    description:
      'An elegant, classic bar stool with a wicker seat and simple metal frame. With its French rattan and oak seat and simple black metal legs, this unique bar stool will look great at any bar. Together with the idiom, the choice of materials creates a warm, sophisticated, floating look and a fundamental lightness. With its classic design and touch of modern lightness',
  },
];
export default popular;
