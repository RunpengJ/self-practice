const cardData = [
  { front: "_______ learning involves training a model on labeled data so it can predict the correct output for new, unseen examples.", back: "Supervised" },
  { front: "_______ learning finds hidden structure or patterns in unlabeled data without predefined targets.", back: "Unsupervised" },
  { front: "_______ occurs when a model captures noise in the training set and performs poorly on new data.", back: "Overfitting" },
  { front: "The _______–_______ trade-off involves balancing model simplicity and complexity to achieve the lowest generalization error.", back: "bias–variance" },
  { front: "_______ _______ is an optimization algorithm that iteratively adjusts model parameters to minimize a loss function.", back: "Gradient descent" },
  { front: "_______ is used to discourage overly complex models by adding a penalty to the loss, helping prevent overfitting.", back: "Regularization" },
  { front: "_______-_______ is a technique that splits data into multiple train/test folds to estimate model performance reliably.", back: "Cross-validation" },
  { front: "_______ _______ puts features on a similar scale so gradient-based and distance-based algorithms converge faster and work correctly.", back: "Feature scaling" },
  { front: "A _______ _______ is a table summarizing correct and incorrect predictions for each class in classification tasks.", back: "confusion matrix" },
  { front: "_______ measures correctness among positive predictions; _______ measures how many actual positives were captured.", back: "Precision; recall" }
];

export default cardData;