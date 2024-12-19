**How long you spent on the assignment.**
About 2 hours

**What you like about your implementation**
Pretty much all of the logic is in pure utils, so it can easily be tested. It is not "compact", but I felt that wasn't the way to go for a timeline; if the space between events was condensed then it would not properly show the scale. It is responsive. It could be adapted into an agenda view for an actual calendar.

**What you would change if you were going to do it again.**
There's a bug I didn't get to fixing. Styling is minimal right now. Some optimizations that I skipped to save time. I just made a "hack", for white space between events that relies on adding empty divs, it should just use margins or a single block with a calculated width instead. It should really use a memo since these calculations aren't the cheapest.

**How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.**
It was kind of hard to find an example that didn't look like a gantt chart, which would have taken up more space. But I realized it's really just a calendar view, so I looked at what iOS does for multi-day views on their calendar.

**How you would test this if you had more time.**
I isolated most of the logic to a utils file and broke it down into steps, so each one can be tested using unit tests pretty easily.
