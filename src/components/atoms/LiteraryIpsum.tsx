/*
 * Displays the first paragraphs of some of the best literary works that are now in the public domain.
 */

import * as React from 'react';

import './LiteraryIpsum.scss';

export function LiteraryIpsum() {
  return (
    <article className="literary-ipsum">
      { all[Math.floor(Math.random() * all.length)] }
    </article>
  )
}

const theMurdersInTheRueMorgue = [
  <p key="1">THE mental features discoursed of as the analytical, are, in themselves, but little susceptible of analysis. We appreciate them only in their effects. We know of them, among other things, that they are always to their possessor, when inordinately possessed, a source of the liveliest enjoyment. As the strong man exults in his physical ability, delighting in such exercises as call his muscles into action, so glories the analyst in that moral activity which disentangles. He derives pleasure from even the most trivial occupations bringing his talent into play. He is fond of enigmas, of conundrums, of hieroglyphics; exhibiting in his solutions of each a degree of acumen which appears to the ordinary apprehension præternatural. His results, brought about by the very soul and essence of method, have, in truth, the whole air of intuition.</p>,
  <p key="2">The faculty of re-solution is possibly much invigorated by mathematical study, and especially by that highest branch of it which, unjustly, and merely on account of its retrograde operations, has been called, as if par excellence, analysis. Yet to calculate is not in itself to analyse. A chess-player, for example, does the one without effort at the other. It follows that the game of chess, in its effects upon mental character, is greatly misunderstood. I am not now writing a treatise, but simply prefacing a somewhat peculiar narrative by observations very much at random; I will, therefore, take occasion to assert that the higher powers of the reflective intellect are more decidedly and more usefully tasked by the unostentatious game of draughts than by all the elaborate frivolity of chess. In this latter, where the pieces have different and bizarre motions, with various and variable values, what is only complex is mistaken (a not unusual error) for what is profound. The attention is here called powerfully into play. If it flag for an instant, an oversight is committed, resulting in injury or defeat. The possible moves being not only manifold but involute, the chances of such oversights are multiplied; and in nine cases out of ten it is the more concentrative rather than the more acute player who conquers. In draughts, on the contrary, where the moves are unique and have but little variation, the probabilities of inadvertence are diminished, and the mere attention being left comparatively unemployed, what advantages are obtained by either party are obtained by superior acumen. To be less abstract --Let us suppose a game of draughts where the pieces are reduced to four kings, and where, of course, no oversight is to be expected. It is obvious that here the victory can be decided (the players being at all equal) only by some recherche movement, the result of some strong exertion of the intellect. Deprived of ordinary resources, the analyst throws himself into the spirit of his opponent, identifies himself therewith, and not unfrequently sees thus, at a glance, the sole methods (sometimes indeed absurdly simple ones) by which he may seduce into error or hurry into miscalculation.</p>
];

const theTellTaleHeart = [
  <p key="1">TRUE! -- nervous -- very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses -- not destroyed -- not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily -- how calmly I can tell you the whole story</p>,
  <p key="2">It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me. He had never given me insult. For his gold I had no desire. I think it was his eye! yes, it was this! He had the eye of a vulture --a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees -- very gradually --I made up my mind to take the life of the old man, and thus rid myself of the eye forever</p>,
  <p key="3">Now this is the point. You fancy me mad. Madmen know nothing. But you should have seen me. You should have seen how wisely I proceeded --with what caution --with what foresight --with what dissimulation I went to work! I was never kinder to the old man than during the whole week before I killed him. And every night, about midnight, I turned the latch of his door and opened it --oh so gently! And then, when I had made an opening sufficient for my head, I put in a dark lantern, all closed, closed, so that no light shone out, and then I thrust in my head. Oh, you would have laughed to see how cunningly I thrust it in! I moved it slowly --very, very slowly, so that I might not disturb the old man's sleep. It took me an hour to place my whole head within the opening so far that I could see him as he lay upon his bed. Ha! --would a madman have been so wise as this? And then, when my head was well in the room, I undid the lantern cautiously --oh, so cautiously --cautiously (for the hinges creaked) --I undid it just so much that a single thin ray fell upon the vulture eye. And this I did for seven long nights --every night just at midnight --but I found the eye always closed; and so it was impossible to do the work; for it was not the old man who vexed me, but his Evil Eye. And every morning, when the day broke, I went boldly into the chamber, and spoke courageously to him, calling him by name in a hearty tone, and inquiring how he has passed the night. So you see he would have been a very profound old man, indeed, to suspect that every night, just at twelve, I looked in upon him while he slept.</p>
];

const aStudyInScarlet = [
  <p key="1">In the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing at Bombay, I learned that my corps had advanced through the passes, and was already deep in the enemy's country. I followed, however, with many other officers who were in the same situation as myself, and succeeded in reaching Candahar in safety, where I found my regiment, and at once entered upon my new duties.</p>,
  <p key="2">The campaign brought honours and promotion to many, but for me it had nothing but misfortune and disaster. I was removed from my brigade and attached to the Berkshires, with whom I served at the fatal battle of Maiwand. There I was struck on the shoulder by a Jezail bullet, which shattered the bone and grazed the subclavian artery. I should have fallen into the hands of the murderous Ghazis had it not been for the devotion and courage shown by Murray, my orderly, who threw me across a pack-horse, and succeeded in bringing me safely to the British lines.</p>,
  <p key="3">Worn with pain, and weak from the prolonged hardships which I had undergone, I was removed, with a great train of wounded sufferers, to the base hospital at Peshawar. Here I rallied, and had already improved so far as to be able to walk about the wards, and even to bask a little upon the verandah, when I was struck down by enteric fever, that curse of our Indian possessions. For months my life was despaired of, and when at last I came to myself and became convalescent, I was so weak and emaciated that a medical board determined that not a day should be lost in sending me back to England. I was dispatched, accordingly, in the troopship Orontes, and landed a month later on Portsmouth jetty, with my health irretrievably ruined, but with permission from a paternal government to spend the next nine months in attempting to improve it.</p>,
  <p key="4">I had neither kith nor kin in England, and was therefore as free as air—or as free as an income of eleven shillings and sixpence a day will permit a man to be. Under such circumstances, I naturally gravitated to London, that great cesspool into which all the loungers and idlers of the Empire are irresistibly drained. There I stayed for some time at a private hotel in the Strand, leading a comfortless, meaningless existence, and spending such money as I had, considerably more freely than I ought. So alarming did the state of my finances become, that I soon realized that I must either leave the metropolis and rusticate somewhere in the country, or that I must make a complete alteration in my style of living. Choosing the latter alternative, I began by making up my mind to leave the hotel, and to take up my quarters in some less pretentious and less expensive domicile.</p>,
];

const aliceInWonderland = [
  <p key="1">Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, `and what is the use of a book,' thought Alice `without pictures or conversation?' </p>,
  <p key="2">So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her. </p>,
  <p key="3">There was nothing so VERY remarkable in that; nor did Alice think it so VERY much out of the way to hear the Rabbit say to itself, `Oh dear! Oh dear! I shall be late!' (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually TOOK A WATCH OUT OF ITS WAISTCOAT- POCKET, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.</p>,
  <p key="4">In another moment down went Alice after it, never once considering how in the world she was to get out again.</p>,
  <p key="5">The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.</p>,
];

const strangeCaseOfDrJekyllAndMrHyde = [
  <p key="1">MR. UTTERSON the lawyer was a man of a rugged countenance, that was
never lighted by a smile; cold, scanty and embarrassed in
discourse; backward in sentiment; lean, long, dusty, dreary, and
yet somehow lovable. At friendly meetings, and when the wine was to
his taste, something eminently human beaconed from his eye;
something indeed which never found its way into his talk, but which
spoke not only in these silent symbols of the after-dinner face, but
more often and loudly in the acts of his life. He was austere with
himself; drank gin when he was alone, to mortify a taste for
vintages; and though he enjoyed the theatre, had not crossed the
doors of one for twenty years. But he had an approved tolerance for
others; sometimes wondering, almost with envy, at the high pressure
of spirits involved in their misdeeds; and in any extremity inclined
to help rather than to reprove.
</p>,
  <p key="2">"I incline to Cain's heresy," he used to say quaintly: "I let my
brother go to the devil in his own way." In this character, it was
frequently his fortune to be the last reputable acquaintance and the
last good influence in the lives of down-going men. And to such as
these, so long as they came about his chambers, he never marked a
shade of change in his demeanour.
</p>,
  <p key="3">No doubt the feat was easy to Mr. Utterson; for he was
undemonstrative at the best, and even his friendship seemed to be
founded in a similar catholicity of good-nature. It is the mark of a
modest man to accept his friendly circle ready-made from the hands
of opportunity; and that was the lawyer's way. His friends were
those of his own blood or those whom he had known the longest; his
affections, like ivy, were the growth of time, they implied no
aptness in the object. Hence, no doubt, the bond that united him to
Mr. Richard Enfield, his distant kinsman, the well-known man about
town. It was a nut to crack for many, what these two could see in
each other, or what subject they could find in common. It was
reported by those who encountered them in their Sunday walks, that
they said nothing, looked singularly dull, and would hail with
obvious relief the appearance of a friend. For all that, the two men
put the greatest store by these excursions, counted them the chief
jewel of each week, and not only set aside occasions of pleasure,
but even resisted the calls of business, that they might enjoy them uninterrupted.</p>,
  <p key="4">It chanced on one of these rambles that their way led them down a
by-street in a busy quarter of London. The street was small and
what is called quiet, but it drove a thriving trade on the
week-days. The inhabitants were all doing well, it seemed, and all
emulously hoping to do better still, and laying out the surplus of
their gains in coquetry; so that the shop fronts stood along that
thoroughfare with an air of invitation, like rows of smiling
saleswomen. Even on Sunday, when it veiled its more florid charms
and lay comparatively empty of passage, the street shone out in
contrast to its dingy neighbourhood, like a fire in a forest; and
with its freshly painted shutters, well-polished brasses, and
general cleanliness and gaiety of note, instantly caught and pleased
the eye of the passenger.</p>,
];

const thePictureOfDorianGray = [
  <p key="1">The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac, or the more delicate perfume of the pink-flowering thorn.</p>,
  <p key="2">From the corner of the divan of Persian saddle-bags on which he was lying, smoking, as was his custom, innumerable cigarettes, Lord Henry Wotton could just catch the gleam of the honey-sweet and honey-coloured blossoms of a laburnum, whose tremulous branches seemed hardly able to bear the burden of a beauty so flamelike as theirs; and now and then the fantastic shadows of birds in flight flitted across the long tussore-silk curtains that were stretched in front of the huge window, producing a kind of momentary Japanese effect, and making him think of those pallid, jade-faced painters of Tokyo who, through the medium of an art that is necessarily immobile, seek to convey the sense of swiftness and motion. The sullen murmur of the bees shouldering their way through the long unmown grass, or circling with monotonous insistence round the dusty gilt horns of the straggling woodbine, seemed to make the stillness more oppressive. The dim roar of London was like the bourdon note of a distant organ.</p>,
  <p key="3">In the centre of the room, clamped to an upright easel, stood the full-length portrait of a young man of extraordinary personal beauty, and in front of it, some little distance away, was sitting the artist himself, Basil Hallward, whose sudden disappearance some years ago caused, at the time, such public excitement and gave rise to so many strange conjectures.</p>,
  <p key="4">As the painter looked at the gracious and comely form he had so skilfully mirrored in his art, a smile of pleasure passed across his face, and seemed about to linger there. But he suddenly started up, and closing his eyes, placed his fingers upon the lids, as though he sought to imprison within his brain some curious dream from which he feared he might awake.</p>
];

const theTimeMachine = [
  <p key="1">The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. His grey eyes shone and twinkled, and his usually pale face was flushed and animated. The fire burned brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses. Our chairs, being his patents, embraced and caressed us rather than submitted to be sat upon, and there was that luxurious after-dinner atmosphere when thought roams gracefully free of the trammels of precision. And he put it to us in this way—marking the points with a lean forefinger—as we sat and lazily admired his earnestness over this new paradox (as we thought it) and his fecundity.</p>,
  <p key="2">'You must follow me carefully. I shall have to controvert one or two ideas that are almost universally accepted. The geometry, for instance, they taught you at school is founded on a misconception.'</p>,
  <p key="3">'Is not that rather a large thing to expect us to begin upon?' said Filby, an argumentative person with red hair.</p>,
  <p key="4">'I do not mean to ask you to accept anything without reasonable ground for it. You will soon admit as much as I need from you. You know of course that a mathematical line, a line of thickness nil, has no real existence. They taught you that? Neither has a mathematical plane. These things are mere abstractions.'</p>
];

const all = [
  theMurdersInTheRueMorgue,
  theTellTaleHeart,
  aStudyInScarlet,
  aliceInWonderland,
  strangeCaseOfDrJekyllAndMrHyde,
  thePictureOfDorianGray,
  theTimeMachine
];