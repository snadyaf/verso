const physicalBooks = {
  1513: { quantidade: 4 },  // Romeo and Juliet
  100: { quantidade: 6 },   // The Complete Works of William Shakespeare
  11: { quantidade: 3 },    // Alice's Adventures in Wonderland
  1661: { quantidade: 5 },  // A Study in Scarlet (Sherlock Holmes)
  84: { quantidade: 2 },    // Frankenstein
  1342: { quantidade: 4 },  // Pride and Prejudice
  345: { quantidade: 0 },   // Dracula (sem estoque no momento)
  2701: { quantidade: 3 },  // Moby Dick
};

export function getPhysicalAvailability(bookId) {
  const entry = physicalBooks[bookId];

  if (!entry) {
    return { available: false, quantity: 0 };
  }

  return { available: entry.quantidade > 0, quantity: entry.quantidade };
}

export default physicalBooks;