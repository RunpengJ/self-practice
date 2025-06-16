const cardData = [
  { front: "What is supervised learning?", back: "Training a model on labeled data so it can predict the correct output for new, unseen examples." },
  { front: "What is unsupervised learning?", back: "Finding hidden structure or patterns in unlabeled data without predefined targets." },
  { front: "Define overfitting.", back: "When a model captures noise in the training set and performs poorly on new data." },
  { front: "What is the bias–variance trade-off?", back: "Balancing model simplicity (bias) and complexity (variance) to achieve the lowest generalization error." },
  { front: "Explain gradient descent.", back: "An optimization algorithm that iteratively adjusts model parameters to minimize a loss function." },
  { front: "Why use regularization?", back: "To discourage overly complex models by adding a penalty to the loss, helping prevent overfitting." },
  { front: "What is cross-validation?", back: "A technique that splits data into multiple train/test folds to estimate model performance reliably." },
  { front: "Why perform feature scaling?", back: "To put features on a similar scale so gradient-based and distance-based algorithms converge faster and work correctly." },
  { front: "What is a confusion matrix?", back: "A table summarizing correct and incorrect predictions for each class in classification tasks." },
  { front: "Precision vs. Recall?", back: "Precision measures correctness among positive predictions; recall measures how many actual positives were captured." }
];

export default cardData;