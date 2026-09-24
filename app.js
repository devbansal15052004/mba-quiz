// app.js
(function () {
  let currentSubjectId = null;
  let currentTopicId = null;

  let currentQuestionIndex = 0;
  let currentQuestionOrder = [];
  let isReviewMode = false;
  let reviewFilter = null;

  const answerState = new Map();
  const markedQuestions = new Set();

  const subjectListEl = document.getElementById("subject-list");
  const topicListEl = document.getElementById("topic-list");
  const breadcrumbEl = document.getElementById("breadcrumb");
  const searchInputEl = document.getElementById("search-input");
  const modeToggleBtn = document.getElementById("mode-toggle");

  const questionCounterEl = document.getElementById("question-counter");
  const questionTypeLabelEl = document.getElementById("question-type-label");
  const questionOriginLabelEl = document.getElementById("question-origin-label");
  const progressBarFillEl = document.getElementById("progress-bar-fill");
  const scoreSummaryEl = document.getElementById("score-summary");

  const questionTextEl = document.getElementById("question-text");
  const optionsListEl = document.getElementById("options-list");
  const markBtn = document.getElementById("mark-btn");
  const prevBtn = document.getElementById("prev-btn");
  const submitBtn = document.getElementById("submit-btn");
  const nextBtn = document.getElementById("next-btn");

  const feedbackPanelEl = document.getElementById("feedback-panel");
  const answerStatusEl = document.getElementById("answer-status");
  const correctAnswerEl = document.getElementById("correct-answer");
  const quickExplanationEl = document.getElementById("quick-explanation");
  const deepExplanationEl = document.getElementById("deep-explanation");
  const deepToggleBtn = document.getElementById("deep-toggle-btn");
  const generatedQuestionsContainerEl = document.getElementById(
    "generated-questions-container"
  );

  const restartTopicBtn = document.getElementById("restart-topic-btn");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const reviewIncorrectBtn = document.getElementById("review-incorrect-btn");
  const reviewMarkedBtn = document.getElementById("review-marked-btn");

  const summaryModalEl = document.getElementById("summary-modal");
  const summaryTextEl = document.getElementById("summary-text");
  const topicPerformanceEl = document.getElementById("topic-performance");
  const retryTopicBtn = document.getElementById("retry-topic-btn");
  const retryIncorrectBtn = document.getElementById("retry-incorrect-btn");
  const closeSummaryBtn = document.getElementById("close-summary-btn");

  function getCurrentSubject() {
    return QUIZ_DATA.subjects.find((s) => s.id === currentSubjectId) || null;
  }

  function getCurrentTopic() {
    const subject = getCurrentSubject();
    if (!subject) return null;
    return subject.topics.find((t) => t.id === currentTopicId) || null;
  }

  function getCurrentQuestions() {
    const topic = getCurrentTopic();
    if (!topic) return [];
    return topic.questions || [];
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildQuestionOrder(filter = null) {
    const questions = getCurrentQuestions();
    let indices = questions.map((_, idx) => idx);

    if (filter === "incorrect") {
      indices = indices.filter((idx) => {
        const q = questions[idx];
        const st = answerState.get(q.id);
        return st && st.correct === false;
      });
    } else if (filter === "marked") {
      indices = indices.filter((idx) => {
        const q = questions[idx];
        return markedQuestions.has(q.id);
      });
    }

    if (indices.length === 0) {
      indices = questions.map((_, idx) => idx);
    }
    return indices;
  }

  function computeScore() {
    const questions = getCurrentQuestions();
    let correct = 0;
    let incorrect = 0;
    questions.forEach((q) => {
      const st = answerState.get(q.id);
      if (!st) return;
      if (st.correct) correct++;
      else incorrect++;
    });
    return { correct, incorrect, total: questions.length };
  }

  function renderSubjects() {
    subjectListEl.innerHTML = "";
    QUIZ_DATA.subjects.forEach((subject) => {
      const div = document.createElement("div");
      div.className = "subject-item";
      if (subject.id === currentSubjectId) div.classList.add("active");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = subject.name;

      const countSpan = document.createElement("span");
      const questionCount =
        subject.topics.reduce(
          (acc, t) => acc + (t.questions ? t.questions.length : 0),
          0
        ) || 0;
      countSpan.className = "subject-count";
      countSpan.textContent = `${subject.topics.length} topics • ${questionCount} Qs`;

      div.appendChild(nameSpan);
      div.appendChild(countSpan);

      div.addEventListener("click", () => {
        currentSubjectId = subject.id;
        const firstTopic = subject.topics[0];
        if (firstTopic) {
          currentTopicId = firstTopic.id;
          resetTopicState();
          renderSubjects();
          renderTopics();
          renderBreadcrumb();
          renderQuestion();
        }
      });

      subjectListEl.appendChild(div);
    });
  }

  function renderTopics() {
    topicListEl.innerHTML = "";
    const subject = getCurrentSubject();
    if (!subject) return;

    subject.topics.forEach((topic) => {
      const div = document.createElement("div");
      div.className = "topic-item";
      if (topic.id === currentTopicId) div.classList.add("active");

      const nameSpan = document.createElement("span");
      nameSpan.textContent = topic.name;

      const countSpan = document.createElement("span");
      countSpan.className = "topic-count";
      countSpan.textContent = `${topic.questions.length} Qs`;

      div.appendChild(nameSpan);
      div.appendChild(countSpan);

      div.addEventListener("click", () => {
        currentTopicId = topic.id;
        resetTopicState();
        renderTopics();
        renderBreadcrumb();
        renderQuestion();
      });

      topicListEl.appendChild(div);
    });
  }

  function renderBreadcrumb() {
    const subject = getCurrentSubject();
    const topic = getCurrentTopic();
    breadcrumbEl.innerHTML = "";
    if (!subject || !topic) return;
    const span = document.createElement("span");
    span.textContent = `${subject.name} › ${topic.name}`;
    breadcrumbEl.appendChild(span);
  }

  function renderQuestion() {
    const questions = getCurrentQuestions();
    if (!questions.length) {
      questionTextEl.textContent =
        "No questions available for this topic yet. Add questions in quizData.js.";
      optionsListEl.innerHTML = "";
      feedbackPanelEl.classList.add("hidden");
      questionCounterEl.textContent = "";
      scoreSummaryEl.textContent = "";
      progressBarFillEl.style.width = "0%";
      return;
    }

    if (currentQuestionIndex < 0) currentQuestionIndex = 0;
    if (currentQuestionIndex >= currentQuestionOrder.length) {
      currentQuestionIndex = currentQuestionOrder.length - 1;
    }

    const questionIndex = currentQuestionOrder[currentQuestionIndex];
    const question = questions[questionIndex];

    questionCounterEl.textContent = `Question ${
      currentQuestionIndex + 1
    } of ${currentQuestionOrder.length}`;

    questionTypeLabelEl.textContent =
      question.questionType?.toUpperCase() || "MCQ";

    questionOriginLabelEl.textContent = "Original Question";

    const { correct, incorrect, total } = computeScore();
    const answeredCount = correct + incorrect;
    scoreSummaryEl.textContent = `Score: ${correct}/${total} • Answered: ${answeredCount}`;

    const progress = total ? Math.round((answeredCount / total) * 100) : 0;
    progressBarFillEl.style.width = `${progress}%`;

    questionTextEl.textContent = question.questionText;

    optionsListEl.innerHTML = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const optionIndices = question.options
      ? question.options.map((_, idx) => idx)
      : [];
    const randomized = shuffleArray(optionIndices).map((origIdx, posIdx) => ({
      origIdx,
      label: letters[posIdx] || "",
      text: question.options[origIdx]
    }));
    optionsListEl.dataset.mapping = JSON.stringify(randomized);

    randomized.forEach((opt) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.type = "button";

      const labelSpan = document.createElement("span");
      labelSpan.className = "option-label";
      labelSpan.textContent = opt.label;

      const textSpan = document.createElement("span");
      textSpan.className = "option-text";
      textSpan.textContent = opt.text;

      btn.appendChild(labelSpan);
      btn.appendChild(textSpan);

      btn.addEventListener("click", () => {
        const allBtns = optionsListEl.querySelectorAll(".option-btn");
        allBtns.forEach((b) => b.classList.remove("selected"));
        btn.classList.add("selected");
      });

      li.appendChild(btn);
      optionsListEl.appendChild(li);
    });

    const prevState = answerState.get(question.id);
    if (prevState) {
      const allBtns = optionsListEl.querySelectorAll(".option-btn");
      const mapping = JSON.parse(optionsListEl.dataset.mapping || "[]");
      const mappedIndex = mapping.findIndex(
        (m) => m.origIdx === prevState.selectedIndex
      );
      if (mappedIndex >= 0 && allBtns[mappedIndex]) {
        allBtns[mappedIndex].classList.add("selected");
      }
    }

    markBtn.textContent = markedQuestions.has(question.id)
      ? "Unmark"
      : "Mark for Review";

    if (prevState) {
      renderFeedback(question, prevState);
    } else {
      feedbackPanelEl.classList.add("hidden");
    }

    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled =
      currentQuestionIndex === currentQuestionOrder.length - 1;

    submitBtn.disabled = !question.options || !question.options.length;
  }

  function renderFeedback(question, state) {
    const mapping = JSON.parse(optionsListEl.dataset.mapping || "[]");
    const allBtns = optionsListEl.querySelectorAll(".option-btn");

    allBtns.forEach((b) => b.classList.remove("correct", "incorrect"));

    const selectedOrigIdx = state.selectedIndex;
    const correctOrigIdx = question.correctAnswerIndex;

    const selectedMappedIdx = mapping.findIndex(
      (m) => m.origIdx === selectedOrigIdx
    );
    const correctMappedIdx = mapping.findIndex(
      (m) => m.origIdx === correctOrigIdx
    );

    if (selectedMappedIdx >= 0 && allBtns[selectedMappedIdx]) {
      allBtns[selectedMappedIdx].classList.add(
        state.correct ? "correct" : "incorrect"
      );
    }
    if (correctMappedIdx >= 0 && allBtns[correctMappedIdx]) {
      allBtns[correctMappedIdx].classList.add("correct");
    }

    feedbackPanelEl.classList.remove("hidden");
    answerStatusEl.textContent = state.correct ? "Correct" : "Incorrect";
    answerStatusEl.classList.toggle("correct", state.correct);
    answerStatusEl.classList.toggle("incorrect", !state.correct);

    if (Array.isArray(question.options)) {
      const correctText = question.options[question.correctAnswerIndex];
      correctAnswerEl.textContent = `Correct Answer: ${correctText}`;
    } else {
      correctAnswerEl.textContent = "";
    }

    quickExplanationEl.innerHTML = "";
    if (Array.isArray(question.quickExplanation)) {
      const ul = document.createElement("ul");
      question.quickExplanation.forEach((point) => {
        const li = document.createElement("li");
        li.textContent = point;
        ul.appendChild(li);
      });
      quickExplanationEl.appendChild(ul);
    }

    deepExplanationEl.classList.add("hidden");
    deepToggleBtn.textContent = "Show Deep Explanation";
    deepExplanationEl.innerHTML = "";
    if (question.deepExplanation) {
      const d = question.deepExplanation;
      if (d.text) {
        const p = document.createElement("p");
        p.textContent = d.text;
        deepExplanationEl.appendChild(p);
      }
      if (Array.isArray(d.commonPitfalls) && d.commonPitfalls.length) {
        const h4 = document.createElement("h4");
        h4.textContent = "Common Pitfalls";
        deepExplanationEl.appendChild(h4);
        const ul = document.createElement("ul");
        d.commonPitfalls.forEach((c) => {
          const li = document.createElement("li");
          li.textContent = c;
          ul.appendChild(li);
        });
        deepExplanationEl.appendChild(ul);
      }
      if (Array.isArray(d.examples) && d.examples.length) {
        const h4 = document.createElement("h4");
        h4.textContent = "Examples";
        deepExplanationEl.appendChild(h4);
        const ul = document.createElement("ul");
        d.examples.forEach((e) => {
          const li = document.createElement("li");
          li.textContent = e;
          ul.appendChild(li);
        });
        deepExplanationEl.appendChild(ul);
      }
      if (d.additionalInfo && d.additionalInfo.content) {
        const div = document.createElement("div");
        div.className = "additional-info";
        const label = d.additionalInfo.note || "Additional Information";
        div.innerHTML = `<strong>${label}:</strong> ${d.additionalInfo.content}`;
        deepExplanationEl.appendChild(div);
      }
    }

    renderGeneratedQuestions(question);
  }

  function renderGeneratedQuestions(question) {
    generatedQuestionsContainerEl.innerHTML = "";
    const related = generateRelatedQuestions(question);
    if (!related.length) return;
    const h4 = document.createElement("h4");
    h4.textContent = "Related (AI-Generated) Questions";
    generatedQuestionsContainerEl.appendChild(h4);

    related.forEach((rq) => {
      const card = document.createElement("div");
      card.className = "generated-question-card";
      const label = document.createElement("div");
      label.className = "badge badge-secondary";
      label.textContent = "AI-Generated Question";
      const text = document.createElement("div");
      text.textContent = rq;
      card.appendChild(label);
      card.appendChild(text);
      generatedQuestionsContainerEl.appendChild(card);
    });
  }

  function generateRelatedQuestions(question) {
    const text = (question.questionText || "").toLowerCase();
    const tags = question.tags || [];
    const out = [];

    if (text.includes("base year") || tags.includes("base-year")) {
      out.push(
        "How might the choice of an abnormal year (e.g., pandemic year) as the GDP base year distort real GDP measurements?"
      );
      out.push(
        "Give an example of how a shift towards digital transactions could make an old GDP base year less representative."
      );
    }

    if (
      text.includes("nominal") ||
      text.includes("real gdp") ||
      tags.includes("nominal-vs-real")
    ) {
      out.push(
        "Explain a situation where nominal GDP rises but real GDP is almost flat."
      );
      out.push(
        "How would you interpret a year where real GDP growth is high but nominal GDP growth is only slightly higher?"
      );
    }

    if (tags.includes("exchange-rate")) {
      out.push(
        "How does using PPP (purchasing power parity) instead of market exchange rates change international GDP comparisons?"
      );
      out.push(
        "Give an example where a country’s currency appreciation improves its dollar GDP ranking without major changes in real output."
      );
    }

    if (
      tags.includes("bank-credit") ||
      tags.includes("investment") ||
      tags.includes("capex")
    ) {
      out.push(
        "Why might a surge in unsecured retail credit be less supportive of long-term growth than a surge in corporate capex loans?"
      );
      out.push(
        "Describe a scenario where bank credit grows but GDP growth does not improve as much as expected."
      );
    }

    if (tags.includes("forecasts")) {
      out.push(
        "Why should policymakers and students treat GDP forecasts as conditional scenarios rather than certainties?"
      );
      out.push(
        "What kind of new information could lead Moody’s or the IMF to revise their India growth forecasts?"
      );
    }

    if (tags.includes("risks")) {
      out.push(
        "How can a spike in global oil prices affect both inflation and the current account balance of an oil-importing country like India?"
      );
      out.push(
        "Give an example of how El Niño-related food price shocks can influence monetary policy decisions."
      );
    }

    return out;
  }

  function handleSubmitAnswer() {
    const questions = getCurrentQuestions();
    if (!questions.length) return;

    const qIndex = currentQuestionOrder[currentQuestionIndex];
    const question = questions[qIndex];

    const allBtns = optionsListEl.querySelectorAll(".option-btn");
    const mapping = JSON.parse(optionsListEl.dataset.mapping || "[]");
    let selectedMappedIdx = -1;
    allBtns.forEach((btn, idx) => {
      if (btn.classList.contains("selected")) selectedMappedIdx = idx;
    });
    if (selectedMappedIdx === -1) {
      alert("Please select an answer.");
      return;
    }

    const selectedOrigIdx = mapping[selectedMappedIdx]?.origIdx;
    const isCorrect = selectedOrigIdx === question.correctAnswerIndex;

    answerState.set(question.id, {
      correct: isCorrect,
      selectedIndex: selectedOrigIdx
    });

    renderFeedback(question, { correct: isCorrect, selectedIndex: selectedOrigIdx });
    renderQuestion();
  }

  function changeQuestion(delta) {
    const newIndex = currentQuestionIndex + delta;
    if (newIndex < 0 || newIndex >= currentQuestionOrder.length) return;
    currentQuestionIndex = newIndex;
    renderQuestion();
  }

  function toggleMarkCurrent() {
    const questions = getCurrentQuestions();
    if (!questions.length) return;
    const qIndex = currentQuestionOrder[currentQuestionIndex];
    const question = questions[qIndex];
    if (markedQuestions.has(question.id)) {
      markedQuestions.delete(question.id);
    } else {
      markedQuestions.add(question.id);
    }
    renderQuestion();
  }

  function resetTopicState() {
    answerState.clear();
    markedQuestions.clear();
    isReviewMode = false;
    reviewFilter = null;
    const qs = getCurrentQuestions();
    currentQuestionOrder = qs.map((_, idx) => idx);
    currentQuestionIndex = 0;
  }

  function restartTopic() {
    resetTopicState();
    renderQuestion();
  }

  function shuffleTopic() {
    const qs = getCurrentQuestions();
    currentQuestionOrder = shuffleArray(qs.map((_, idx) => idx));
    currentQuestionIndex = 0;
    renderQuestion();
  }

  function reviewFiltered(filterType) {
    reviewFilter = filterType;
    isReviewMode = true;
    currentQuestionOrder = buildQuestionOrder(filterType);
    currentQuestionIndex = 0;
    renderQuestion();
  }

  function showSummaryModal() {
    const { correct, incorrect, total } = computeScore();
    const attempted = correct + incorrect;
    const percent = total ? Math.round((correct / total) * 100) : 0;
    summaryTextEl.textContent = `You answered ${attempted} out of ${total} questions. Correct: ${correct}, Incorrect: ${incorrect} (${percent}%).`;

    const topic = getCurrentTopic();
    topicPerformanceEl.textContent = topic
      ? `Topic: ${topic.name}`
      : "Topic performance data.";

    summaryModalEl.classList.remove("hidden");
  }

  function findQuestionByTerm(term) {
    for (let sIdx = 0; sIdx < QUIZ_DATA.subjects.length; sIdx++) {
      const subject = QUIZ_DATA.subjects[sIdx];
      for (let tIdx = 0; tIdx < subject.topics.length; tIdx++) {
        const topic = subject.topics[tIdx];
        for (let qIdx = 0; qIdx < topic.questions.length; qIdx++) {
          const q = topic.questions[qIdx];
          const haystack = [
            q.questionText,
            ...(q.quickExplanation || []),
            q.source || "",
            ...(q.tags || [])
          ]
            .join(" ")
            .toLowerCase();
          if (haystack.includes(term)) {
            return {
              subjectId: subject.id,
              topicId: topic.id,
              questionIndex: qIdx
            };
          }
        }
      }
    }
    return null;
  }

  function init() {
    if (!QUIZ_DATA || !Array.isArray(QUIZ_DATA.subjects)) {
      console.error("QUIZ_DATA.subjects is missing or invalid.");
      return;
    }
    if (QUIZ_DATA.subjects.length === 0) return;

    currentSubjectId = QUIZ_DATA.subjects[0].id;
    currentTopicId = QUIZ_DATA.subjects[0].topics[0]?.id || null;

    resetTopicState();
    renderSubjects();
    renderTopics();
    renderBreadcrumb();
    renderQuestion();

    submitBtn.addEventListener("click", handleSubmitAnswer);
    prevBtn.addEventListener("click", () => changeQuestion(-1));
    nextBtn.addEventListener("click", () => changeQuestion(1));
    markBtn.addEventListener("click", toggleMarkCurrent);

    restartTopicBtn.addEventListener("click", restartTopic);
    shuffleBtn.addEventListener("click", shuffleTopic);
    reviewIncorrectBtn.addEventListener("click", () =>
      reviewFiltered("incorrect")
    );
    reviewMarkedBtn.addEventListener("click", () => reviewFiltered("marked"));

    deepToggleBtn.addEventListener("click", () => {
      if (deepExplanationEl.classList.contains("hidden")) {
        deepExplanationEl.classList.remove("hidden");
        deepToggleBtn.textContent = "Hide Deep Explanation";
      } else {
        deepExplanationEl.classList.add("hidden");
        deepToggleBtn.textContent = "Show Deep Explanation";
      }
    });

    closeSummaryBtn.addEventListener("click", () => {
      summaryModalEl.classList.add("hidden");
    });
    retryTopicBtn.addEventListener("click", () => {
      summaryModalEl.classList.add("hidden");
      restartTopic();
    });
    retryIncorrectBtn.addEventListener("click", () => {
      summaryModalEl.classList.add("hidden");
      reviewFiltered("incorrect");
    });

    modeToggleBtn.addEventListener("click", () => {
      const body = document.body;
      const isDark = body.classList.toggle("dark-mode");
      modeToggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
    });

    nextBtn.addEventListener("click", () => {
      const qs = getCurrentQuestions();
      const { correct, incorrect } = computeScore();
      const answered = correct + incorrect;
      if (
        currentQuestionIndex === currentQuestionOrder.length - 1 &&
        answered === qs.length
      ) {
        showSummaryModal();
      }
    });

    searchInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const term = e.target.value.trim().toLowerCase();
        if (!term) return;
        const match = findQuestionByTerm(term);
        if (match) {
          currentSubjectId = match.subjectId;
          currentTopicId = match.topicId;
          resetTopicState();
          currentQuestionOrder = getCurrentQuestions().map((_, idx) => idx);
          currentQuestionIndex = match.questionIndex;
          renderSubjects();
          renderTopics();
          renderBreadcrumb();
          renderQuestion();
        } else {
          alert("No question matched your search.");
        }
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
