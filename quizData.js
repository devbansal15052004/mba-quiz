// quizData.js
// This is the ONLY file you edit to add/change questions.

const QUIZ_DATA = {
  subjects: [
    {
      id: "macro-economics",
      name: "Macroeconomics",
      topics: [
        {
          id: "gdp",
          name: "GDP",
          questions: [
            {
              id: "macro_gdp_baseyear_001",
              questionText:
                "Why does India periodically change the GDP base year (most recently from 2011–12 to 2022–23)?",
              questionType: "concept",
              options: [
                "To artificially increase reported GDP growth rates",
                "To align GDP measurement with current price structure and economic realities",
                "To comply with a legal requirement to change base year every five years",
                "To make historical GDP series incomparable with other countries"
              ],
              correctAnswerIndex: 1,
              quickExplanation: [
                "The base year is used to measure real GDP at constant prices.",
                "As the economy’s structure changes (digital economy, new industries), the old base becomes less representative.",
                "Updating the base year aligns GDP measurement with the current structure of the economy."
              ],
              deepExplanation: {
                text:
                  "Real GDP is measured at constant (base-year) prices to remove the effect of inflation.\n" +
                  "If the base year is too old, it may not reflect new sectors (digital services, UPI, platform work, etc.), new consumption patterns, and shifts in production.\n\n" +
                  "By changing the base from 2011–12 to 2022–23, India is:\n" +
                  "• Updating the price structure used to calculate real GDP.\n" +
                  "• Incorporating better data sources (GST, MCA, PFMS, vehicle registrations, etc.).\n" +
                  "• Improving measurement of the informal and digital economy.\n\n" +
                  "This allows GDP estimates to better capture the current reality of the Indian economy rather than an outdated picture.",
                commonPitfalls: [
                  "Thinking the base year change is mainly to make the GDP number 'look bigger'.",
                  "Assuming there is a strict legal rule to revise the base every five years.",
                  "Confusing nominal and real GDP when discussing the base year."
                ],
                examples: [
                  "Between 2011–12 and 2022–23, UPI transactions, app-based services, and gig work exploded in India. A base year stuck at 2011–12 would under-represent these activities in real GDP estimates."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – Base year for real GDP",
              tags: ["gdp", "base-year", "real-gdp"],
              difficulty: "medium"
            },
            {
              id: "macro_gdp_baseyear_002",
              questionText:
                "True or False: India is legally required to revise its GDP base year exactly every five years.",
              questionType: "true_false",
              options: ["True", "False"],
              correctAnswerIndex: 1,
              quickExplanation: [
                "India follows a practice of revising the base year roughly every five years.",
                "However, there is no fixed statutory/legal requirement that it must be done every five years."
              ],
              deepExplanation: {
                text:
                  "India has a practice—not a binding legal rule—of updating the GDP base year approximately every five years.\n" +
                  "The timing of revisions is influenced by data availability and whether a given year is representative of 'normal' economic conditions.\n\n" +
                  "Events such as demonetisation, GST implementation, and COVID-19 made some years unsuitable as base years, delaying the revision.",
                commonPitfalls: [
                  "Treating an informal practice as a hard legal requirement.",
                  "Ignoring that unusual shocks (demonetisation, pandemic, tax regime changes) can distort data and make a year a bad base."
                ],
                examples: [
                  "If a country picks a year with a once-in-a-century pandemic as its base year, that year’s data would be highly abnormal and not a good anchor for measuring real growth."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – Base year revision",
              tags: ["gdp", "base-year", "institutional-practice"],
              difficulty: "easy"
            },
            {
              id: "macro_gdp_baseyear_003",
              questionText:
                "Why are nominal GDP and real GDP numerically equal in the base year (for example, in 2022–23 after rebasing)?",
              questionType: "concept",
              options: [
                "Because inflation is assumed to be zero in the base year",
                "Because real GDP is calculated using the base year’s prices, and nominal GDP is also at current prices in that same year",
                "Because the government adjusts GDP numbers to make them match in the base year",
                "Because nominal GDP is always equal to real GDP for every year"
              ],
              correctAnswerIndex: 1,
              quickExplanation: [
                "Real GDP uses constant (base-year) prices.",
                "In the base year, current prices and base-year prices are the same.",
                "Therefore, nominal and real GDP are numerically equal by construction in the base year."
              ],
              deepExplanation: {
                text:
                  "Nominal GDP is calculated using the prices that actually prevail in that year.\n" +
                  "Real GDP is calculated using a fixed set of prices from a chosen base year.\n\n" +
                  "In the base year itself, the 'current' prices used for nominal GDP are exactly the same as the 'base-year' prices used for real GDP.\n" +
                  "So nominal and real GDP are equal in that year by definition, not because inflation is zero or because of any manipulation.",
                commonPitfalls: [
                  "Thinking that equality in the base year means inflation is zero in that year.",
                  "Believing that nominal and real GDP should be equal in other years as well.",
                  "Assuming the equality is due to statistical 'adjustment' rather than how the formula is defined."
                ],
                examples: [
                  "If 2022–23 is the base year, then:\n• Nominal GDP 2022–23 = quantity(2022–23) × price(2022–23)\n• Real GDP 2022–23 = quantity(2022–23) × price(2022–23 base)\nBut base-year price = current price in that year, so both are equal."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – Nominal vs Real GDP",
              tags: ["gdp", "nominal-vs-real", "base-year"],
              difficulty: "easy"
            },
            {
              id: "macro_gdp_exchange_001",
              questionText:
                "India’s nominal GDP ranking can fall in global US-dollar terms even if its real GDP is growing strongly. What is the main reason for this?",
              questionType: "mcq",
              options: [
                "Global rankings use only real GDP growth rates and ignore prices",
                "India’s statistics are frequently revised downward",
                "Global rankings are based on nominal GDP in US dollars, so rupee depreciation can lower dollar GDP",
                "India’s GDP is measured incorrectly in rupees"
              ],
              correctAnswerIndex: 2,
              quickExplanation: [
                "Global rankings typically use nominal GDP converted into US dollars at market exchange rates.",
                "If the rupee depreciates, the same rupee GDP converts into fewer dollars.",
                "So India’s dollar GDP ranking can fall even when domestic real output is rising."
              ],
              deepExplanation: {
                text:
                  "Real GDP measures output adjusted for inflation in domestic currency.\n" +
                  "However, global rankings (like '6th largest economy') usually use nominal GDP converted to a common currency such as the US dollar.\n\n" +
                  "If the rupee depreciates against the dollar, a given rupee GDP becomes a smaller dollar amount. This can lower India’s ranking even if real GDP growth is strong.\n" +
                  "Hence, a fall in dollar GDP ranking does not necessarily mean that domestic real activity has fallen.",
                commonPitfalls: [
                  "Assuming a lower dollar-ranking means India is producing less in real terms.",
                  "Ignoring the role of exchange rates when comparing GDP across countries.",
                  "Confusing nominal GDP in rupees with nominal GDP in US dollars."
                ],
                examples: [
                  "If India’s GDP is ₹300 lakh crore and the exchange rate moves from ₹70/$ to ₹80/$, dollar GDP falls from about $4.29 trillion to $3.75 trillion even if rupee GDP is unchanged."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – Nominal GDP ranking",
              tags: ["gdp", "exchange-rate", "international-comparison"],
              difficulty: "medium"
            },
            {
              id: "macro_gdp_growth_jefferies_001",
              questionText:
                "Jefferies expects India’s real GDP growth to be around 6.5–7% and nominal GDP growth to be 11–12%. What mainly explains the gap between nominal and real GDP growth?",
              questionType: "concept",
              options: [
                "Measurement errors in GDP statistics",
                "The impact of exchange-rate fluctuations on GDP",
                "Changes in the population growth rate",
                "Price-level changes (inflation) being included in nominal GDP but removed in real GDP"
              ],
              correctAnswerIndex: 3,
              quickExplanation: [
                "Nominal GDP captures both quantity (real output) and price changes.",
                "Real GDP attempts to strip out price changes by using constant/base-year prices.",
                "So the difference between nominal and real growth largely reflects inflation."
              ],
              deepExplanation: {
                text:
                  "Real GDP growth focuses on how much output (goods and services) has increased, holding prices constant at base-year levels.\n" +
                  "Nominal GDP growth measures output at current prices, so it combines real quantity changes with price-level changes.\n\n" +
                  "If Jefferies expects about 6.5–7% real growth and 11–12% nominal growth, the extra 4–5 percentage points broadly reflect inflation and changes in the price level.",
                commonPitfalls: [
                  "Interpreting nominal GDP growth as if it were purely real growth.",
                  "Ignoring the role of inflation when comparing nominal and real series.",
                  "Assuming the gap is primarily due to exchange-rate movements in a domestic GDP series."
                ],
                examples: [
                  "If real GDP grows 7% and the general price level rises by about 4%, nominal GDP might grow close to 11% (= 7% real + ~4% price effect, approximately)."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – Jefferies growth outlook",
              tags: ["gdp", "nominal-vs-real", "growth-forecast"],
              difficulty: "medium"
            },
            {
              id: "macro_gdp_drivers_jefferies_002",
              questionText:
                "According to the Jefferies analysis, which chain best describes how rising bank credit can support higher GDP growth?",
              questionType: "scenario",
              options: [
                "Higher bank credit → lower corporate borrowing → reduced capex → lower GDP growth",
                "Higher bank credit → more corporate borrowing → higher investment/capex → higher economic activity → potentially higher GDP growth",
                "Higher bank credit → higher household savings → lower consumption → weaker GDP growth",
                "Higher bank credit → higher imports only → no change in domestic GDP"
              ],
              correctAnswerIndex: 1,
              quickExplanation: [
                "Rising bank credit, especially corporate lending, can finance investment in capacity and capital expenditure.",
                "More investment and capex can raise economic activity.",
                "This supports stronger GDP growth, other things equal."
              ],
              deepExplanation: {
                text:
                  "Jefferies notes strong year-on-year growth in bank credit, including MSME loans and corporate lending.\n" +
                  "When firms borrow more for investment (capex), they may set up new plants, expand capacity, or modernize equipment.\n\n" +
                  "This investment spending directly adds to GDP in the short run (as spending on goods and services) and can raise potential output in the long run.",
                commonPitfalls: [
                  "Assuming all credit growth is automatically bad or inflationary.",
                  "Ignoring the composition of credit (corporate vs. purely consumption financing).",
                  "Thinking bank credit matters only for the government and not for private investment."
                ],
                examples: [
                  "If corporate lending grows by 20% and firms use these funds to build factories, order machinery, and hire workers, this raises investment and production—contributing to GDP."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – Jefferies: bank credit and capex",
              tags: ["gdp", "bank-credit", "investment", "capex"],
              difficulty: "medium"
            },
            {
              id: "macro_gdp_forecasts_moodys_001",
              questionText:
                "Moody’s raised its FY27 real GDP growth forecast for India from 6% to 7%. Which of the following best explains why different institutions (Moody’s, S&P, RBI, IMF) can have different growth forecasts for the same year?",
              questionType: "concept",
              options: [
                "They use entirely different definitions of GDP",
                "GDP forecasting is arbitrary and not based on any economic reasoning",
                "They rely on different assumptions, information sets, and assessment dates when forming their projections",
                "Only domestic institutions are allowed to make accurate forecasts"
              ],
              correctAnswerIndex: 2,
              quickExplanation: [
                "Forecasts are forward-looking estimates, not measured outcomes.",
                "Different institutions use different models, data updates and assumptions.",
                "So reasonable forecast differences (e.g., 6.4–7.0%) are normal and not necessarily contradictory."
              ],
              deepExplanation: {
                text:
                  "Forecasts for FY27 growth from Moody’s, S&P, RBI, and IMF differ slightly (around 6.4–7.0%).\n" +
                  "These differences arise because institutions:\n" +
                  "• Use different macroeconomic models and methodologies.\n" +
                  "• Update forecasts at different times (thus using different data).\n" +
                  "• Make different assumptions about variables such as oil prices, global demand, fiscal policy, and investment.\n\n" +
                  "This does not mean one forecast is 'wrong' ex ante—only that they are conditional on different assumptions.",
                commonPitfalls: [
                  "Treating any difference in forecasts as a fundamental disagreement about the economy’s structure.",
                  "Assuming forecasts must match the eventual realized GDP exactly.",
                  "Believing one institution has a monopoly on 'correct' numbers."
                ],
                examples: [
                  "Moody’s may assume slightly stronger private investment or infrastructure spending than the IMF, leading to a higher projected growth rate for the same year."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – Moody’s vs other forecasts table",
              tags: ["gdp", "forecasts", "institutions"],
              difficulty: "medium"
            },
            {
              id: "macro_gdp_risks_001",
              questionText:
                "Which of the following combinations correctly represents major risks to India’s growth discussed in the pre-read?",
              questionType: "mcq",
              options: [
                "Falling energy prices, strong remittances, and rapid fiscal consolidation",
                "Higher energy prices, El Niño-related food price shocks, weaker external demand, and fiscal pressure",
                "Only monetary policy tightening by the RBI",
                "Only slower growth in the services sector"
              ],
              correctAnswerIndex: 1,
              quickExplanation: [
                "The readings highlight several downside risks: high energy prices, El Niño effects on food prices, external sector pressures and fiscal challenges.",
                "These can affect inflation, real purchasing power, the current account, and fiscal consolidation."
              ],
              deepExplanation: {
                text:
                  "Macroeconomic outlook is not only about headline GDP growth but also about risks around that baseline.\n" +
                  "Key risks discussed include:\n" +
                  "• Higher energy/oil prices → higher import bill → inflationary pressure → weaker consumption.\n" +
                  "• El Niño-related food price shocks → lower real purchasing power → weaker household demand.\n" +
                  "• External sector pressures (weaker global demand, lower remittances) → wider current account deficit.\n" +
                  "• Fiscal pressures (subsidies, defence, infrastructure) → slower fiscal consolidation despite a target of reducing deficit to around 4.3% of GDP.",
                commonPitfalls: [
                  "Focusing only on upside stories (consumption, investment) and ignoring risk factors.",
                  "Equating strong recent GDP data with 'no macro risks'.",
                  "Confusing short-term cyclical risks with long-term structural issues."
                ],
                examples: [
                  "A sustained spike in oil prices due to a Middle East conflict can raise India’s import bill, worsen the current account, and limit the space for fiscal expansion—all of which can weigh on growth."
                ]
              },
              source:
                "Your 1st Macroeconomics class pre-read – What could go wrong?",
              tags: ["gdp", "risks", "inflation", "external-sector", "fiscal"],
              difficulty: "medium"
            }
          ]
        }
      ]
    }
  ]
};
