console.log('[D2D Highlighter] content-script.js loaded');



// Your keywords as before

const KEYWORDS = [

  // Existing

  "rewrite", "tagged", "sentence", "words", "rewritten", "flagged", "AI response", "Context", "Preserve", "Inappropriate", "Restricted",

  "rephrased", "paraphrased", "this section has been rewritten", "this paragraph was rewritten", "no change needed",

  "as requested", "this content", "the following content", "the above content", "placeholder", "insert text", "insert here",

  "ai-generated", "ai-generated content", "generated by ai", "ai edited", "ai suggestion", "machine-generated", "as an ai language model",

  "i am an ai", "based on your request", "content warning", "no flagged content", "no inappropriate content", "nothing to change",

  "no action needed", "no further action", "no issues found", "marked as", "review needed", "review complete", "moderator", "moderator note",

  "editor note", "system note", "system message", "assistant", "assistant note", "as per your instructions", "per your request", "sensitive content",

  "sanitized", "this passage", "section redacted", "section removed", "section deleted", "unchanged", "unedited", "no edits necessary",

  "if you require further changes", "let me know if you need", "this is a placeholder", "section placeholder", "the rewritten version",

  "the flagged content", "flag:", "rewrite:", "redacted", "omitted", "11", "12", "13", "14", "15", "16", "17",


  // Added, extended

  "generated text", "ai output", "ai output only", "ai completion", "auto-generated", "auto generated", "artificial intelligence",

  "chatgpt", "openai", "language model", "language model output", "model response", "model generated", "model output", "model suggestion",

  "machine output", "ai moderation", "ai checked", "ai review", "ai reviewed", "review comment", "ai insert", "ai insertion", "ai correction",

  "editorial note", "editorial comment", "editorial suggestion", "note from editor", "editor's note", "system generated", "system generated text",

  "autogenerated", "autogenerated content", "insert here", "insert your text", "your content here", "replace this", "replace me",

  "fill in", "fill this section", "replace section", "complete this section", "complete the section", "continue here",

  "please add content", "please insert", "insert your answer", "continue writing", "to be completed", "to be filled",

  "lorem ipsum", "ipsum dolor", "dummy text", "sample text", "example content", "template", "template text",

  "to be added", "tba", "not applicable", "n/a", "not available", "missing content", "pending", "under review", "for review", "for moderation",

  "for completion", "pending update", "pending completion", "pending content",

  "do not include", "do not use", "do not display", "do not publish", "do not submit",

  "no changes necessary", "no further changes", "nothing to add", "nothing further", "as needed", "where applicable",

  "editor comment", "editor comments", "ai note", "note from ai", "ai disclaimer", "model disclaimer", "disclaimer:",

  "no flagged issues", "no flagged words", "no flagged sentences", "no flagged phrases", "no issues to report",

  "no problems found", "no issues detected", "nothing inappropriate", "nothing to report", "no inappropriate words", "no inappropriate phrases",

  "no inappropriate sentences", "safe content", "suitable content", "this is suitable", "this is safe",

  "system output", "system placeholder", "system response", "response from ai", "ai-generated answer", "ai-generated reply", "automated response",

  "automated text", "automatic text", "auto text", "auto reply", "auto response",

  "automatically generated", "auto-generated", "generated automatically", "automatically inserted",

  "content goes here", "your answer here", "your response here", "insert answer here", "insert response here",

  "see above", "see below", "as shown above", "as shown below",

  "replace with", "replace content", "replace this text", "replace above", "replace below",

  "section to be filled", "section to fill", "section for completion",

  "delete this", "delete me", "delete above", "delete below",

  "remove this", "remove above", "remove below",

  "insert missing", "missing section", "section missing", "content missing", "missing answer", "missing response",

  "to be rewritten", "to be rephrased", "to be reviewed", "to be edited", "to be replaced",

  "this section has been reviewed", "this paragraph has been reviewed", "this paragraph has been rephrased",

  "sentence flagged", "sentence redacted", "sentence replaced", "sentence rewritten", "sentence reviewed", "sentence edited", "sentence omitted",

  "paraphrase", "paraphrased by ai", "paraphrased version", "paraphrased content",

  "no edit necessary", "no edits required", "no change required", "no change necessary", "no revision necessary", "no revision required",

  "ready for review", "ready for moderation", "ready for editing", "ready to publish", "ready to submit",

  "for further changes", "requires further changes", "requires review", "requires moderation", "requires completion",

  "please note", "note:", "note to reader", "note to editor", "please review", "please revise", "please rewrite", "please edit",

  "no modification needed", "no modification necessary", "no modifications needed", "no modifications necessary",

  "no editing required", "no editing necessary", "no revisions required", "no revisions necessary",

  "flagged by ai", "flagged by model", "flagged by system", "flagged content", "flagged section",

  "this part", "this passage", "this sentence", "this paragraph", "this section", "the part above", "the part below",

  "insert flag", "flag this", "redact this", "omit this", "edit this", "review this", "replace this",

  // Even some "human" phrases that AI might insert:

  "I hope this helps", "let me know if you need anything else", "if you have further questions", "if you require more information",

  "if you would like me to", "as per your request", "per your request", "as per instructions", "according to your request",

  // Fragments and abbreviations

  "ai:", "gpt", "chat-gpt", "gpt-3", "gpt-4", "gpt4", "gpt3", "llm", "llms", "ai model", "model:",

  // Additional system/assistant notes:

  "[insert", "[placeholder", "[editor", "[note", "[system", "[assistant", "[moderator", "[ai", "[auto", "[generated",

  // Fragments and catch-alls (these are short, beware false positives!):

  "flag:", "edit:", "note:", "review:", "rephrase:", "paraphrase:", "replace:", "delete:", "insert:", "update:",

];



// Age-related keywords for conservative detection

const AGE_KEYWORDS = [

  "baby", "baby brother", "baby sister", "little boy", "little girl", "teen", "teenage", "teenager",

  "barely legal", "barely eighteen", "barely 18", "underage", "young", "youthful", "minor", "kid",

  "child", "toddler", "adolescent", "prepubescent", "pubescent", "nursery", "diaper",

  "schoolgirl", "school boy", "schoolgirl outfit", "school uniform", "grade school", "freshman",

  "cheerleader", "roleplay school", "loli", "lolita", "shota", "pigtails", "babydoll", "brat",

  "innocent little", "tiny", "virgin", "first time", "mommy's boy", "daddy's girl", "naive",

  "obedient", "petite girl", "girl next door", "captive", "age gap", "young lady", "school skirt",

  "barely", "teenybopper", "girlhood", "pajamas", "stuffed animal", "young looking",

  "school crush", "babysitter", "sippy cup", "crib", "ribbons", "ponytails",

  "youngest", "younger than", "not yet legal", "barely of age", "just turned", "barely noticeable curves",

  "undeveloped", "pre-legal", "not legal", "early bloomer", "immature", "still developing",

  "not developed", "barely grown", "budding", "pre-teen", "recently turned", "newly legal",

  "under the age", "high school age", "innocent looking", "still a child", "barely matured",

  "not quite legal", "not quite adult", "still maturing", "recent graduate",

  "baby face", "baby-faced", "flat chested", "flat-chested", "pouty lips", "innocent face",

  "wide-eyed", "freckles", "bare knees", "soft giggle", "giggling", "high-pitched voice",

  "dimpled", "puppy fat", "chubby cheeks", "soft features", "squeaky voice", "tiny waist",

  "twinkling eyes", "playful smile", "childlike", "youthful skin", "unblemished", "adorable giggle",

  "bashful", "clumsy", "padded bra", "awkward posture", "little frame", "growing body",

  "girlish laugh", "awkward charm",

  "prep school", "recess", "homeroom", "backpack", "locker", "school bag", "classroom",

  "pencil case", "homework", "detention", "cafeteria", "school bell", "chalkboard",

  "school bus", "lunch tray", "report card", "pop quiz", "hall pass", "yearbook",

  "gym class", "field trip", "dodgeball", "lunchbox", "training bra", "book report",

  "study hall", "school trip", "parent-teacher", "desk", "class schedule", "coloring book",

  "alphabet chart", "storytime", "playground", "building blocks", "finger paint", "show and tell"

];



// Age-related keywords that should be matched as whole words only (to avoid false positives)

const AGE_WHOLE_WORD_KEYWORDS = [

  "baby", "teen", "minor", "kid", "child", "young", "tiny", "virgin", "barely", "naive", "brat",

  "innocent", "captive", "desk", "fresh", "growing", "recent", "tween"

];



const WHOLE_WORD_KEYWORDS = ["AI"];

const SENTENCE_MIN_LENGTH = 30;

const PUNCTUATION_REGEX = /[.?!…]+["'"')\]]*$/;



// Helper

function escapeRegExp(string) {

    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

}



// Apply keyword highlighting to text

function highlightKeywords(text) {

    let result = text;

    

    // Highlight whole word keywords

    WHOLE_WORD_KEYWORDS.forEach(word => {

        const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi");

        result = result.replace(regex, '<span class="d2d-highlight" style="background: yellow; color: black;">$&</span>');

    });

    

    // Highlight other keywords

    KEYWORDS.forEach(word => {

        if (WHOLE_WORD_KEYWORDS.includes(word)) return;

        const regex = new RegExp(escapeRegExp(word), "gi");

        result = result.replace(regex, '<span class="d2d-highlight" style="background: yellow; color: black;">$&</span>');

    });

    

    return result;

}



// Apply age-related keyword highlighting to text

function highlightAgeKeywords(text) {

    let result = text;

    

    // Highlight age-related whole word keywords

    AGE_WHOLE_WORD_KEYWORDS.forEach(word => {

        const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, "gi");

        result = result.replace(regex, '<span class="d2d-age-concern" style="background: #ff69b4; color: white;">$&</span>');

    });

    

    // Highlight other age-related keywords

    AGE_KEYWORDS.forEach(word => {

        if (AGE_WHOLE_WORD_KEYWORDS.includes(word)) return;

        const regex = new RegExp(escapeRegExp(word), "gi");

        result = result.replace(regex, '<span class="d2d-age-concern" style="background: #ff69b4; color: white;">$&</span>');

    });

    

    return result;

}



// Recursively walk text nodes

function walkTextNodes(node, callback) {

    if (node.nodeType === Node.TEXT_NODE) {

        callback(node);

    } else if (node.nodeType === Node.ELEMENT_NODE) {

        // Do not highlight already-processed or highlight tags

        if (

            node.classList?.contains('d2d-highlight') ||

            node.classList?.contains('d2d-missing-punct') ||

            node.classList?.contains('d2d-enum-runaway') ||

            node.classList?.contains('d2d-repetitive-questions') ||

            node.classList?.contains('d2d-age-concern')

        ) return;

        for (let child of node.childNodes) {

            walkTextNodes(child, callback);

        }

    }

}



// Detect repetitive question patterns in text

function detectRepetitiveQuestions(text) {

    const matches = [];

    

    // Pattern 1: Multiple "Did you..." questions in sequence

    const didYouPattern = /(?:Did\s+you\s+[^.?!]*\?[^.?!]*){2,}/gi;

    const didYouMatches = text.match(didYouPattern);

    if (didYouMatches) {

        didYouMatches.forEach(match => {

            const startIndex = text.indexOf(match);

            if (startIndex !== -1) {

                matches.push({

                    text: match.trim(),

                    start: startIndex,

                    end: startIndex + match.length,

                    type: "repetitive 'Did you' questions"

                });

            }

        });

    }

    

    // Pattern 2: Multiple "Do you..." questions in sequence

    const doYouPattern = /(?:Do\s+you\s+[^.?!]*\?[^.?!]*){2,}/gi;

    const doYouMatches = text.match(doYouPattern);

    if (doYouMatches) {

        doYouMatches.forEach(match => {

            const startIndex = text.indexOf(match);

            if (startIndex !== -1) {

                matches.push({

                    text: match.trim(),

                    start: startIndex,

                    end: startIndex + match.length,

                    type: "repetitive 'Do you' questions"

                });

            }

        });

    }

    

    // Pattern 3: Multiple "Does..." questions in sequence

    const doesPattern = /(?:Does\s+[^.?!]*\?[^.?!]*){2,}/gi;

    const doesMatches = text.match(doesPattern);

    if (doesMatches) {

        doesMatches.forEach(match => {

            const startIndex = text.indexOf(match);

            if (startIndex !== -1) {

                matches.push({

                    text: match.trim(),

                    start: startIndex,

                    end: startIndex + match.length,

                    type: "repetitive 'Does' questions"

                });

            }

        });

    }

    

    // Pattern 4: Generic repetitive question pattern - 3+ questions with similar structure

    const genericQuestionPattern = /(?:[^.!?]*\?[^.!?]*){3,}/gi;

    const genericMatches = text.match(genericQuestionPattern);

    if (genericMatches) {

        genericMatches.forEach(match => {

            // Only flag if it contains question words and is actually repetitive

            const questionCount = (match.match(/\?/g) || []).length;

            if (questionCount >= 3) {

                const startIndex = text.indexOf(match);

                if (startIndex !== -1) {

                    matches.push({

                        text: match.trim(),

                        start: startIndex,

                        end: startIndex + match.length,

                        type: "repetitive questions"

                    });

                }

            }

        });

    }



    // Sort by start position and merge overlapping matches

    matches.sort((a, b) => a.start - b.start);

    

    // Remove overlaps - keep the longest match

    const cleanMatches = [];

    for (let i = 0; i < matches.length; i++) {

        const current = matches[i];

        let shouldAdd = true;

        

        for (let j = 0; j < cleanMatches.length; j++) {

            const existing = cleanMatches[j];

            // Check if they overlap

            if (!(current.end <= existing.start || current.start >= existing.end)) {

                // They overlap - keep the longer one

                if (current.text.length > existing.text.length) {

                    cleanMatches.splice(j, 1);

                    break;

                } else {

                    shouldAdd = false;

                    break;

                }

            }

        }

        

        if (shouldAdd) {

            cleanMatches.push(current);

        }

    }



    return cleanMatches;

}



// Detect AI looping patterns in text

function detectAILooping(text) {

    const patterns = [

        // "as he made him X, as he made him Y, as he made him Z" pattern

        {

            regex: /\bas\s+he\s+made\s+him\s+\w+(?:,\s*as\s+he\s+made\s+him\s+\w+){2,}/gi,

            name: "as he made him"

        },

        // "with X, with Y, with Z" pattern (4+ occurrences)

        {

            regex: /\bwith\s+\w+(?:,\s*with\s+\w+){3,}/gi,

            name: "with repetition"

        },

        // "of [name]'s X, of [name]'s Y" pattern

        {

            regex: /\bof\s+\w+'s\s+\w+(?:,\s*of\s+\w+'s\s+\w+){2,}/gi,

            name: "possessive repetition"

        },

        // "to his X, to his Y, to his Z" pattern

        {

            regex: /\bto\s+his\s+\w+(?:,\s*to\s+his\s+\w+){2,}/gi,

            name: "to his repetition"

        },

        // Numbers/bullets: "1. X 2. Y 3. Z" or "- X - Y - Z"

        {

            regex: /(?:\d+[\.\)]\s+[^.!?]*[.!?]*\s*){3,}/gi,

            name: "numbered list"

        },

        {

            regex: /(?:[\-\•\*]\s+[^.!?]*[.!?]*\s*){3,}/gi,

            name: "bulleted list"

        }

    ];



    const matches = [];

    

    patterns.forEach(pattern => {

        const found = text.match(pattern.regex);

        if (found) {

            found.forEach(match => {

                const startIndex = text.indexOf(match);

                if (startIndex !== -1) {

                    matches.push({

                        text: match.trim(),

                        start: startIndex,

                        end: startIndex + match.length,

                        type: pattern.name

                    });

                }

            });

        }

    });



    // Sort by start position and merge overlapping matches

    matches.sort((a, b) => a.start - b.start);

    

    // Remove overlaps - keep the longest match

    const cleanMatches = [];

    for (let i = 0; i < matches.length; i++) {

        const current = matches[i];

        let shouldAdd = true;

        

        for (let j = 0; j < cleanMatches.length; j++) {

            const existing = cleanMatches[j];

            // Check if they overlap

            if (!(current.end <= existing.start || current.start >= existing.end)) {

                // They overlap - keep the longer one

                if (current.text.length > existing.text.length) {

                    cleanMatches.splice(j, 1);

                    break;

                } else {

                    shouldAdd = false;

                    break;

                }

            }

        }

        

        if (shouldAdd) {

            cleanMatches.push(current);

        }

    }



    return cleanMatches;

}


function addTooltipToElement(element, message, className) {
    // Create and add tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'd2d-custom-tooltip';
    tooltip.innerHTML = message;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 8px;
        border-radius: 4px;
        font-size: 12px;
        max-width: 300px;
        z-index: 10000;
        display: none;
        pointer-events: none;
        font-weight: normal;
    `;
    
    // Add tooltip to the iframe document
    const iframeDoc = element.ownerDocument;
    iframeDoc.body.appendChild(tooltip);
    
    // Add hover events
    element.addEventListener('mouseenter', (e) => {
        const rect = element.getBoundingClientRect();
        tooltip.style.left = (rect.left + iframeDoc.defaultView.scrollX) + 'px';
        tooltip.style.top = (rect.bottom + iframeDoc.defaultView.scrollY + 5) + 'px';
        tooltip.style.display = 'block';
    });
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
}

// Process a single text node

function processTextNode(textNode) {
    let text = textNode.nodeValue;
    if (!text || !text.trim()) return;

    let result = text;
    let madeChange = false;
    let hasPatterns = false;

    // 1. Check for repetitive questions first
    const questions = detectRepetitiveQuestions(text);
    if (questions.length > 0) {
        hasPatterns = true;
        // Process from end to beginning to avoid index shifting
        questions.sort((a, b) => b.start - a.start);
        
        questions.forEach(question => {
            const before = result.substring(0, question.start);
            const after = result.substring(question.end);
            
            // Apply keyword highlighting to the question text before wrapping
            let highlightedQuestionText = highlightKeywords(question.text);
            highlightedQuestionText = highlightAgeKeywords(highlightedQuestionText);
            
            const highlighted = `<span class="d2d-repetitive-questions" style="background: #ff6b6b; color: white;" title="Repetitive question pattern detected: ${question.type}">${highlightedQuestionText}</span>`;
            result = before + highlighted + after;
            madeChange = true;
        });
    }

    // 2. Check for AI looping patterns
    const loops = detectAILooping(text);
    if (loops.length > 0) {
        hasPatterns = true;
        // Process from end to beginning to avoid index shifting
        loops.sort((a, b) => b.start - a.start);
        
        loops.forEach(loop => {
            const before = result.substring(0, loop.start);
            const after = result.substring(loop.end);
            
            // Apply keyword highlighting to the loop text before wrapping
            let highlightedLoopText = highlightKeywords(loop.text);
            highlightedLoopText = highlightAgeKeywords(highlightedLoopText);
            
            const highlighted = `<span class="d2d-enum-runaway" style="background: orange; color: black;" title="AI looping detected: ${loop.type}">${highlightedLoopText}</span>`;
            result = before + highlighted + after;
            madeChange = true;
        });
    }

    // 3. Apply keyword highlighting to non-pattern parts
    if (!hasPatterns) {
        // No patterns detected, highlight keywords in the entire text
        const keywordHighlighted = highlightKeywords(result);
        const ageHighlighted = highlightAgeKeywords(keywordHighlighted);
        if (ageHighlighted !== result) {
            result = ageHighlighted;
            madeChange = true;
        }
    } else {
        // Patterns detected, highlight keywords in the parts that aren't already wrapped
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${result}</div>`, 'text/html');
        const div = doc.querySelector('div');
        
        // Walk through text nodes that aren't inside pattern spans
        const textNodes = [];
        function collectTextNodes(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                textNodes.push(node);
            } else if (node.nodeType === Node.ELEMENT_NODE && 
                      !node.classList.contains('d2d-enum-runaway') && 
                      !node.classList.contains('d2d-repetitive-questions')) {
                for (let child of node.childNodes) {
                    collectTextNodes(child);
                }
            }
        }
        collectTextNodes(div);
        
        // Highlight keywords in these text nodes
        textNodes.forEach(textNode => {
            if (textNode.nodeValue && textNode.nodeValue.trim()) {
                let highlighted = highlightKeywords(textNode.nodeValue);
                highlighted = highlightAgeKeywords(highlighted);
                if (highlighted !== textNode.nodeValue) {
                    const span = document.createElement('span');
                    span.innerHTML = highlighted;
                    textNode.parentNode.replaceChild(span, textNode);
                    madeChange = true;
                }
            }
        });
        
        result = div.innerHTML;
    }

    // 4. Check for missing punctuation (only if no major patterns were detected)
    if (!hasPatterns) {
        const trimmed = text.trim();
        if (trimmed.length >= SENTENCE_MIN_LENGTH && !PUNCTUATION_REGEX.test(trimmed)) {
            result = `<span class="d2d-missing-punct" style="background: lightgreen; color: black;" title="Sentence may be missing end punctuation">${result}</span>`;
            madeChange = true;
        }
    }

    if (madeChange) {
        const span = document.createElement('span');
        span.innerHTML = result;
        textNode.parentNode.replaceChild(span, textNode);
        
        // Add tooltips to all highlighted elements in the newly created span
        const highlightedElements = span.querySelectorAll('.d2d-highlight, .d2d-age-concern, .d2d-missing-punct, .d2d-enum-runaway, .d2d-repetitive-questions');
        
        highlightedElements.forEach(element => {
            if (element.classList.contains('d2d-highlight')) {
                addTooltipToElement(element, '⚠️ AI/SYSTEM CONTENT: This text contains keywords commonly found in AI-generated content, placeholder text, or system messages that may violate content guidelines.', 'd2d-highlight');
            } else if (element.classList.contains('d2d-age-concern')) {
                addTooltipToElement(element, '🚫 AGE-RELATED CONTENT: This text contains keywords that may suggest characters are under 18 or imply youth in adult contexts, which violates Draft2Digital guidelines.', 'd2d-age-concern');
            } else if (element.classList.contains('d2d-missing-punct')) {
                addTooltipToElement(element, '📝 MISSING PUNCTUATION: This sentence appears to be missing proper end punctuation (period, question mark, or exclamation point).', 'd2d-missing-punct');
            } else if (element.classList.contains('d2d-enum-runaway')) {
                addTooltipToElement(element, '🔄 AI LOOPING DETECTED: This text shows repetitive patterns typical of AI-generated content that got stuck in a loop or enumeration pattern.', 'd2d-enum-runaway');
            } else if (element.classList.contains('d2d-repetitive-questions')) {
                addTooltipToElement(element, '❓ REPETITIVE QUESTIONS: Multiple similar questions in sequence often indicate AI-generated content or poor writing quality.', 'd2d-repetitive-questions');
            }
        });
    }
}



// Check if keyword matches any problematic terms

function isProblematicKeyword(keyword) {

    const lowerKeyword = keyword.toLowerCase().trim();

    

    // Check against age-related keywords

    for (let ageKeyword of AGE_KEYWORDS) {

        const lowerAgeKeyword = ageKeyword.toLowerCase();

        

        // Check if it's a whole-word keyword

        if (AGE_WHOLE_WORD_KEYWORDS.includes(ageKeyword.toLowerCase())) {

            // Use word boundary matching for whole-word keywords

            const regex = new RegExp(`\\b${escapeRegExp(lowerAgeKeyword)}\\b`, 'i');

            if (regex.test(lowerKeyword)) {

                return { match: true, type: 'age-related', term: ageKeyword };

            }

        } else {

            // Use partial matching for phrases/compound keywords

            if (lowerKeyword.includes(lowerAgeKeyword)) {

                return { match: true, type: 'age-related', term: ageKeyword };

            }

        }

    }

    

    // Check against AI/system keywords too (in case they appear in metadata)

    for (let aiKeyword of KEYWORDS) {

        const lowerAiKeyword = aiKeyword.toLowerCase();

        if (lowerKeyword.includes(lowerAiKeyword)) {

            return { match: true, type: 'ai-related', term: aiKeyword };

        }

    }

    

    return { match: false };

}



// Highlight problematic keywords on metadata pages

function highlightProblematicKeywords() {

    console.log('[D2D Highlighter] Scanning for problematic keywords...');

    

    // Find all keyword elements using the draggable structure

    const keywordElements = document.querySelectorAll('[data-rbd-draggable-id]');

    console.log(`[D2D Highlighter] Found ${keywordElements.length} keyword elements`);

    

    keywordElements.forEach((element, index) => {

        // Skip if already processed

        if (element.classList.contains('d2d-keyword-processed')) {

            console.log(`[D2D Highlighter] Element ${index} already processed`);

            return;

        }

        

        const keywordId = element.getAttribute('data-rbd-draggable-id');

        const keywordTextElement = element.querySelector('.draggable-item-text');

        

        console.log(`[D2D Highlighter] Processing keyword: "${keywordId}"`);

        

        if (keywordId && keywordTextElement) {

            const result = isProblematicKeyword(keywordId);

            

            if (result.match) {

                console.log(`[D2D Highlighter] FLAGGED: "${keywordId}" (matched: ${result.term})`);

                

                // Add highlighting to the keyword element

                if (result.type === 'age-related') {

                    element.style.setProperty('background', '#ff69b4', 'important');

                    element.style.setProperty('border', '2px solid #cc1166', 'important');

                    element.style.setProperty('color', 'red', 'important');

                    

                    // Create and add tooltip

                    const tooltip = document.createElement('div');

                    tooltip.className = 'd2d-custom-tooltip';

                    tooltip.innerHTML = `⚠️ AGE-RELATED KEYWORD: "${keywordId}" contains "${result.term}". Draft2Digital prohibits content suggesting characters are under 18.`;

                    tooltip.style.cssText = `

                        position: absolute;

                        background: rgba(0, 0, 0, 0.9);

                        color: white;

                        padding: 8px;

                        border-radius: 4px;

                        font-size: 12px;

                        max-width: 300px;

                        z-index: 10000;

                        display: none;

                        pointer-events: none;

                        font-weight: normal;

                    `;

                    document.body.appendChild(tooltip);

                    

                    // Add hover events

                    element.addEventListener('mouseenter', (e) => {

                        const rect = element.getBoundingClientRect();

                        tooltip.style.left = (rect.left + window.scrollX) + 'px';

                        tooltip.style.top = (rect.bottom + window.scrollY + 5) + 'px';

                        tooltip.style.display = 'block';

                    });

                    

                    element.addEventListener('mouseleave', () => {

                        tooltip.style.display = 'none';

                    });

                    

                } else if (result.type === 'ai-related') {

                    element.style.setProperty('background', 'yellow', 'important');

                    element.style.setProperty('border', '2px solid #cccc00', 'important');

                    element.style.setProperty('color', 'black', 'important');
                    

                    // Create and add tooltip

                    const tooltip = document.createElement('div');

                    tooltip.className = 'd2d-custom-tooltip';

                    tooltip.innerHTML = `⚠️ AI-RELATED KEYWORD: "${keywordId}" contains "${result.term}". This suggests AI-generated content or placeholder text.`;

                    tooltip.style.cssText = `

                        position: absolute;

                        background: rgba(0, 0, 0, 0.9);

                        color: white;

                        padding: 8px;

                        border-radius: 4px;

                        font-size: 12px;

                        max-width: 300px;

                        z-index: 10000;

                        display: none;

                        pointer-events: none;

                        font-weight: normal;

                    `;

                    document.body.appendChild(tooltip);

                    

                    // Add hover events

                    element.addEventListener('mouseenter', (e) => {

                        const rect = element.getBoundingClientRect();

                        tooltip.style.left = (rect.left + window.scrollX) + 'px';

                        tooltip.style.top = (rect.bottom + window.scrollY + 5) + 'px';

                        tooltip.style.display = 'block';

                    });

                    

                    element.addEventListener('mouseleave', () => {

                        tooltip.style.display = 'none';

                    });

                }

                

                // Also highlight the text inside

                keywordTextElement.style.fontWeight = 'bold';

                keywordTextElement.style.color = 'inherit';

                

            } else {

                console.log(`[D2D Highlighter] OK: "${keywordId}" - no issues found`);

            }

        } else {

            console.log(`[D2D Highlighter] Could not find keyword ID or text element for element ${index}`);

        }

        

        element.classList.add('d2d-keyword-processed');

    });

}



// Only process <p> and <li> (for listings) to avoid massive replacements

function highlightInIframe(iframe, attempt = 1) {

    if (!iframe) return;

    let cw = iframe.contentWindow;

    if (!cw) {

        if (attempt < 50) {

            setTimeout(() => highlightInIframe(iframe, attempt + 1), 100);

        } else {

            console.warn('[D2D Highlighter] iframe.contentWindow is still null after many attempts');

        }

        return;

    }

    let doc = cw.document;

    if (doc && doc.body && doc.body.childNodes.length) {

        console.log('[D2D Highlighter] Running in iframe:', doc.location && doc.location.href);



        let tags = doc.body.querySelectorAll("p, li, div");

        tags.forEach(el => {

            if (!el.classList.contains('d2d-processed')) {

                walkTextNodes(el, processTextNode);

                el.classList.add('d2d-processed');

            }

        });



    } else {

        if (attempt < 50) {

            setTimeout(() => highlightInIframe(iframe, attempt + 1), 100);

        } else {

            console.warn('[D2D Highlighter] iframe body never appeared after many attempts');

        }

    }

}



function setupIframeHighlighter() {

    let iframes = Array.from(document.querySelectorAll('iframe[id^="epubjs-view-"], #previewArea iframe'));

    console.log('[D2D Highlighter] Found iframes:', iframes.length);

    iframes.forEach(iframe => highlightInIframe(iframe));

}



// Main initialization function

function initializeHighlighter() {

    const currentUrl = window.location.href;

    

    // Check if we're on a book preview page (for text content highlighting)

    if (currentUrl.includes('/preview')) {

        console.log('[D2D Highlighter] On preview page - setting up iframe highlighting');

        setupIframeHighlighter();

        

        const iframeAdder = new MutationObserver(() => setupIframeHighlighter());

        iframeAdder.observe(document.body, { childList: true, subtree: true });

    }

    

    // Check if we're on a book metadata/edit page (for keyword highlighting)

    if (currentUrl.includes('/book/m/') && currentUrl.includes('/ebook')) {

        console.log('[D2D Highlighter] On metadata page - setting up keyword highlighting');

        

        // Initial highlight after a longer delay to let page fully load

        setTimeout(highlightProblematicKeywords, 2000);

        

        // Set up more comprehensive observer for dynamically added keywords

        const keywordObserver = new MutationObserver((mutations) => {

            let shouldCheck = false;

            

            mutations.forEach((mutation) => {

                // Check for added nodes that might be keywords

                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {

                    mutation.addedNodes.forEach((node) => {

                        if (node.nodeType === Node.ELEMENT_NODE) {

                            // Check if the added node or its children contain keyword elements

                            if (node.hasAttribute && node.hasAttribute('data-rbd-draggable-id')) {

                                shouldCheck = true;

                            } else if (node.querySelector && node.querySelector('[data-rbd-draggable-id]')) {

                                shouldCheck = true;

                            }

                        }

                    });

                }

                

                // Check for attribute changes on existing elements

                if (mutation.type === 'attributes' && mutation.attributeName === 'data-rbd-draggable-id') {

                    shouldCheck = true;

                }

            });

            

            if (shouldCheck) {

                console.log('[D2D Highlighter] Detected keyword changes, checking for problematic keywords...');

                setTimeout(highlightProblematicKeywords, 100);

            }

        });

        

        keywordObserver.observe(document.body, { 

            childList: true, 

            subtree: true, 

            attributes: true,

            attributeFilter: ['data-rbd-draggable-id']

        });

        

        // More frequent checking for manually added keywords

        const keywordCheckInterval = setInterval(highlightProblematicKeywords, 1000);

        

        // Stop the interval after 5 minutes to avoid running indefinitely

        setTimeout(() => {

            clearInterval(keywordCheckInterval);

            console.log('[D2D Highlighter] Stopped periodic keyword checking after 5 minutes');

        }, 300000);

    }

}



initializeHighlighter();
