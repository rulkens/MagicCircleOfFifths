/**
  circle of fifths - creates an interactive circle of fifths in processing
  
  Required
  ------------------------
  the rwmidi library (http://ruinwesen.com/support-files/rwmidi.zip)
  
  code by Alexander Rulkens
  rulkens@gmail.com
  http://alexrulkens.com/
  
  please give me credit if you use this code for something
  
  
  MAIN file
  
**/

/**
 o - toggle overtones
 n - toggle notes
 TAB - toggle chords
 i - toggle info
 p - toggle everything
 t - toggle tonic structure
**/
String SHORTCUT_TEXT_1 = " o \n n \n tab \n i \n p \n t \n 1-7 \ns";
String SHORTCUT_TEXT_2 = " overtones\n notes\n chords\n info\n present\n tonic structure\n mode\n screenshot";

import rwmidi.*;

MidiInput input;
MidiOutput output;

int[] currentNotes;

// array with all notes used in this set
COFNote[] allNotes;
//ArrayList<COFNote> selectedNotes;
// array with all relevant chords
COFChord[] relevantChords;
// the last chord that has been played
COFChord lastChord;

PGraphics cof;
PGraphics backgroundDrawing;
PGraphics notesDrawing;
PGraphics chordsDrawing;
PGraphics tonicStructureDrawing;


int minSize = 350;
int _minSize = 350;
int maxSize = 650;
int _maxSize = 650;
int padding = 70;

int octaves = 9;
int angle = 0;


// the space for the inside notes -- INFO
int insideSpace = 70;
  

// the current tonic we are using
int currentTonic = 0;
boolean tonicEditable = false;

// the current mode we are using
int currentMode = 1;

String[] modes = { "Lydian", "Major", "Mixolydian", "Dorian", "Minor", "Phrygian", "Locrian" };

boolean sustainActive = false;


/** CONSTANTS
**/

// relative midi note to pitch (0 has to be a C0)
int relativePitch = 12;

// foot switch control message
int footSwitchCC = 0;

/** time-based variables
**/
int timeLastDraw = 0;

// number of ms that no chord has been played
int noChordTime = 0;
int lastChordTime = 0;


/*
fade out time (in ms)
*/
int fadeOutTime = 2000;
float chordIntensity = 1;

/** KEYBOARD **/
/**
 o - toggle overtones
 n - toggle notes
 TAB - toggle chords
 i - toggle info
 SPACE - toggle everything
 t - toggle tonic structure
**/
boolean overtonesEnabled = true;
boolean notesEnabled = true;
boolean chordsEnabled = true;
boolean backgroundEnabled = true;
boolean infoEnabled = true;
boolean tonicStructureEnabled = true;
boolean interfaceEnabled = true;

boolean interfaceLocked = false;

// for the letters
PFont font;

void setup() {
  
  frameRate(20);
  // set correct size
  
  int totalSize = maxSize + padding*2;
  size( totalSize, totalSize, JAVA2D );
  
  input = RWMidi.getInputDevices()[0].createInput(this);
  //output = RWMidi.getOutputDevices()[0].createOutput();
  
  println( "Midi devices connected: " + RWMidi.getInputDevices().length);
  
  // load font
  font = loadFont("Helvetica-Bold-48.vlw"); 
  textFont(font);
  
  //loop();
  //noLoop();
  cof = createGraphics(width, height, JAVA2D);
  backgroundDrawing = createGraphics(width,height, JAVA2D);
  notesDrawing = createGraphics(width,height, JAVA2D);
  tonicStructureDrawing = createGraphics(width,height, JAVA2D);
  
  
  
  initNotes();
  smooth();
  
  
  // only draw the background once
  drawBackground();
  drawTonicStructure();
  
  // color mode
  //colorMode(HSB);
  
  // set full screen background to black
  frame.setBackground(new java.awt.Color(0,0,0));
}

PImage img;

/** drawing routines **/
void draw(){

  if(!interfaceLocked){
  
    background(0);
    
    
  
    strokeCap(SQUARE);
    
    calculateChords();
  
    if(interfaceEnabled){
      if(backgroundEnabled)      drawBackground();
      if(tonicStructureEnabled)  drawTonicStructure();
      if(chordsEnabled)          drawChords();
      if(infoEnabled)            drawInfo();
    } else {
      
      
    }

    if(notesEnabled) {
      
      drawNotes();
      
      //image( notesDrawing, 0, 0);
    }
    
  } else {
    // message to say interface is locked
    textSize(26);
    fill(255);
    text("Pause", width/2, height - 30);
  }
  


  
  timeLastDraw = millis();
  
}

/* draw nice note shapes on the right locations
**/
void drawNotes() {
  
  
  
  
  
  
  int timeThisDraw = millis();
  
  
  float contentSize = (maxSize - minSize);
  float stepSize = contentSize / (octaves) / 2;
  
  for(int i = 0; i< allNotes.length; i++){
    if( allNotes[i].active ){
      
      // UPDATE the note
      // set the timeActive to a new value
      allNotes[i].timeActive += timeThisDraw - timeLastDraw;
      allNotes[i].timeNotActive = 0;
      
      // DRAW the note
      if( notesEnabled )     drawNote( allNotes[i], stepSize, 1, "arc" );
      
      // DRAW the overtones
      if( overtonesEnabled ) drawOvertones( allNotes[i], stepSize );
      
      
    } else {
      
      // DRAW notes that are NOT ACTIVE
      allNotes[i].timeNotActive += timeThisDraw - timeLastDraw;
      
      int timeNotActive = allNotes[i].timeNotActive;
      int timeActive = allNotes[i].timeActive;
      
      if( timeNotActive < fadeOutTime && timeNotActive > 0) {
        float intensity = .5 - allNotes[i].timeNotActive / (float)fadeOutTime *.5;
        //println("Note intensity: " + intensity);
        drawNote( allNotes[i], stepSize, intensity, "arc");
      }
    }
    
    
      
  }
  
  fill(0);
  
  
  
  // update the timeLastDraw variable
  timeLastDraw = millis();
}

/**
draw a note on the circle of fifths
**/
void drawNote( COFNote note, float stepSize, float intensity, String type ){

      //beginDraw();
      
      // the note is active, draw some kind of thing to indicate it's selected
      int octave = note.getOctave();
      int pos = note.getPosition();
      int vel = note.velocity;
      int timeActive = note.timeActive;
      int timeNotActive = note.timeNotActive;
      
      //println("position: " + pos);
      //println("velocity: " + note.velocity);
      
      //double intensity = Math.sqrt(vel / 127.0);
      
      double circleSize = intensity * 30;
      
      // go to the right position
      rotate(0);
      pushMatrix();
      translate(width/2, height / 2);
      rotate(PI/6*pos);
      
      float arcSize = minSize + (stepSize*2) * (octaves - octave) - stepSize;
      
      noFill();
      
      strokeWeight( stepSize );
      
      // choose a beautiful color
      //colorMode(RGB);
      
     
      // other notes
      if(timeActive >= 300 ){
        stroke( 208, 219, 134, (int) constrain((float)((intensity * 255)/Math.sqrt((float)timeActive / 1000)), 0., 255.) );
      }
      if(timeNotActive > 0){
        stroke( 208, 219, 134, (int) (intensity * 255));
      }
      
      // tonic of the first chord
     if(lastChord != null && (note.getMidi() % 12) == lastChord.tonic){
        
          // draw the tonic in another color
          stroke( 16, 147, 137, (int)(intensity * 255)  );
          
          // highlight specific for tonic
          if(timeActive > 0 && timeActive < 300){
            stroke( 25, 229, 212, (int)(intensity * 255) );
          }
      } else {
        // note just pressed
        if(timeActive > 0 && timeActive < 300){
          stroke( 219, 76, 57, (int)(intensity * 255) );
        }
      }
      
      // not used note (overtone)
      if(timeActive < 0){
        // Dark grey
        stroke( 45, 54, 56, (int)(intensity * 255) );
      }
      
      // note that 
      
      
      //stroke( 10 + (int)Math.log(timeActive) * 15, 200, 255, (int)(intensity * 255) );
      
      if(type == "arc")
        arc( 0, 0, arcSize, arcSize, -PI/2-PI/12, -PI/2+PI/12);
      
      if(type == "disc")
        ellipse( 0, -arcSize, 30, 30);
        
      strokeWeight(1);
      
      popMatrix();
      
      //endDraw();
      
      
}

void drawOvertones( COFNote note, float stepSize ){
  
  for(int i = 0; i < COFNote.overtones.length; i++){
    
    // draw with different intensity (alpha)
    // get a new overtone note
    COFNote overtone = new COFNote( note.getMidi() + COFNote.overtones[i] );
    overtone.timeActive = -1;
    // draw it
    drawNote( overtone, stepSize, .6 - ((.4*i)/COFNote.overtones.length), "arc" );
      
  }
}

/** draw chords on the circle of fifths 
**/

void calculateChords(){
  

  
  //println( "drawing chords" );
  ArrayList selectedNotes = new ArrayList();
  
  for(int i = 0; i< allNotes.length; i++){
    if( allNotes[i].active ){
      selectedNotes.add(allNotes[i]);
    }
  }
  
  //println( "--selected notes size: " + selectedNotes.size());
  ArrayList selectedMidiNotes = new ArrayList();
  //loop through the notes
  for(int i = 0; i<selectedNotes.size();i++){
    COFNote currentNote = (COFNote) selectedNotes.get(i);
    selectedMidiNotes.add(currentNote.getMidi());
  }
  
  Integer[] selectedMidiNotesArray = new Integer[ selectedMidiNotes.size() ];
  selectedMidiNotesArray = (Integer[]) selectedMidiNotes.toArray(selectedMidiNotesArray);
  
  relevantChords = new COFChord[0];
  
  if( selectedMidiNotesArray.length >= 3 ){
    relevantChords = COFChord.findChords( currentTonic, selectedMidiNotesArray );
  }
  
  
  // calculate Drawing Intensity
  chordIntensity = 1;
  
  // get the last chord that has been played
  // we use it for fading out stuff
  if(relevantChords.length > 0){
    lastChord = relevantChords[0];
    lastChordTime = millis();
    noChordTime = 0;
    chordIntensity = 1;
    
  } else {
    // update drawing time
    noChordTime += millis() - timeLastDraw;
    chordIntensity = .8 - (noChordTime / (float)fadeOutTime * .8);
  }
  
  
  
  
  
}

void drawChords(){
  
  
  float intensity = chordIntensity;
  
  // draw the stuff
  float contentSize = (maxSize - minSize);
  float stepSize = contentSize / (octaves) / 2;
  
  int numChords = relevantChords.length;
  
  // the text describing all the chords
  /* ATM ordered getting smaller and dimmer with more chords
  */
  for(int i = 0; i < numChords; i++){
    
    int[] currentNotes = relevantChords[i].notes;
    String notation = relevantChords[i].getNotationInTonic( currentTonic, currentMode );
    float scaling = (1./((float)(i)+1.));
    float relativeTextSize = ( 50 - (notation.length() * 3/ scaling)   );
    
    float fillColor = 255 * scaling;
    
    fill( fillColor );
    textSize( relativeTextSize );
    text( notation , width / 2, height / 2 + 15 + 20 *i );
    
    /*
    for(int k = 0; k<selectedNotes.size();k++){
      COFNote currentNote = (COFNote) selectedNotes.get(k);
      drawNote( currentNote, stepSize, 1, "disc");
    }*/
  }
  
  // draw mail chord for fading out
  if(lastChord != null & noChordTime > 0 && noChordTime < fadeOutTime){
    int[] currentNotes = lastChord.notes;
    String notation = lastChord.getNotationInTonic( currentTonic, currentMode );
    float relativeTextSize = ( 50 - (notation.length() * 3)   );
    
    fill( 255, (int)(intensity * 255) );
    textSize( relativeTextSize );
    text( notation , width / 2, height / 2 + 15 );
  }
  
  
  
  //colorMode(RGB);
  
  /** CURRENT CHORD **/
  
  
  
  if(lastChord != null && ( noChordTime == 0 || noChordTime < fadeOutTime ) ){
  
    pushMatrix();
    
    
    // update the last chord
    COFChord c = lastChord;
    
      // tonic of the current chord indicator
      translate(width/2, height / 2);
      
      
      int circleSize = 50;
      // chord notes
      fill(219, 207, 193);
      for(int i = 0; i < c.notes.length; i++){
        int currentNote = c.notes[i]+c.tonic;
        int currentPosition = COFNote.getPosition(currentNote);
        pushMatrix();
          
          rotate( PI/6 * currentPosition );
          
          
          // Color of TONIC
          if(currentNote == c.tonic) fill(16, 147, 137, (int)(intensity * 255));
          
          // color of other notes
          else                       fill(208, 219, 134, (int)(intensity * 255));
          
          
          /** CIRCLE **/
          ellipse( 0, -(minSize/2) + insideSpace/2, circleSize, circleSize);
          // and the note again in black
          
          /** TEXT **/
          fill(0, (int)(intensity * 255));
          textSize( 29);
          boolean isFlat = COFNote.isFlatSignature( currentTonic, currentMode );
          text( COFNote.getNotation( currentNote , isFlat ) , 0, -(minSize / 2)+insideSpace/2+10);
          
        popMatrix();
      }
    
    popMatrix();
    
    
  }
  
  
  //colorMode(HSB);
}

void drawChordShapes(){
  
}

/** draw some info about the current chords on screen
**/
void drawInfo() {
  
  textAlign( LEFT );
  
  // draw keyboard shortcuts
  textSize( 12 );
  fill(150); // gray color text
  
  text(SHORTCUT_TEXT_1, 10, 20);
  text(SHORTCUT_TEXT_2, 40, 20);
  
  
  textAlign( CENTER );
  
  
  // the current tonic
  
  if(tonicEditable) fill(50, 200, 200);
  else              fill(170);
  textSize( 18 );
  text( "Tonic", 50, height - 65 );
  
  textSize( 45 );
  
  text(COFNote.getNotation( currentTonic, COFNote.isFlatSignature( currentTonic, currentMode ) ) , 50, height - 15);
  
  // draw number of sharps and flats
  textSize( 28 );
  
  // is flat?
  boolean isFlat = COFNote.isFlatSignature( currentTonic, currentMode );
  int numSignatures = abs( COFNote.getSignature( currentTonic, currentMode ) );
  
  for(int i = 0; i < numSignatures; i++){
    text( (isFlat ? "b" : "#"), 100 + 20*i, height - 32 + (i%2)*10);
  }
  
  // MODES
  textSize( 18 );
  text( "Mode", width - 70, height - 65 );
  textSize( 23 );
  
  text(modes[currentMode] , width - 70, height - 25);
  
  // keyboard shortcuts
  textSize( 12 );
  
}

/** draw the structure for the tonic onto the background circle **/
void drawTonicStructure() {
  
  //beginDraw();
  smooth();
  //background(0);
  strokeCap(SQUARE);
  
  float contentSize = (maxSize - minSize);
  float stepSize = contentSize / (octaves) / 2;
  
  int pos = COFNote.getPosition( currentTonic );
  
  // reset rotation
  rotate(0);
  pushMatrix();
  translate(width/2, height / 2);
  // rotation of the whole structure.
  // has to match up by both the tonic and the current mode
  rotate(PI/6*(pos+1-currentMode));
  
  float outerArcSize = minSize + (stepSize*2) * (octaves+2);
  float innerArcSize = minSize - (insideSpace * 2);
  
  
  // extra lines
  
  
  pushMatrix();
    rotate(-(3*PI)/12);
    
    // draw background
    noFill();
    strokeWeight( stepSize*2 );
    stroke( 37, 115, 95, 100 );
    // for major chords
    arc( 0, 0, maxSize+(stepSize*2), maxSize+(stepSize*2), -PI/2, 0);
    // for minor chords
    stroke( 8, 74, 68, 100 );
    arc( 0, 0, maxSize+(stepSize*2), maxSize+(stepSize*2), 0, PI/2);
    // augmented chord
    stroke( 4, 36, 33, 100 );
    arc( 0, 0, maxSize+(stepSize*2), maxSize+(stepSize*2), PI/2, PI/2+PI/6);
    
    /** Extended Lines **/
    //stroke(65);
    strokeWeight( 1 );
  
    // DRAW extra lines & text
    // outer arc
    for(int i = 0; i < 7; i++){
      rotate(PI/6);
      
      stroke(65);
      line( 0, -maxSize/2-stepSize * 2, 0, -minSize/2+insideSpace );
      
      
      // Draw the Scale Degrees
      float scaleDegreePos = -(maxSize/2)-(stepSize/2);
      pushMatrix();
      rotate(-PI/12);
      
      // calculate the index for the correct scale degree index
      int sdIndex = (i + 8 - currentMode) % 7;
      
      
      
      textSize( 26 );
      if(i < 3){
        // major scale degree
        
        text(COFNote.scaleDegrees[sdIndex],0,scaleDegreePos);
      } else if( i < 6 ){
        // minor scale degree
        text(COFNote.scaleDegrees[sdIndex].toLowerCase(),0,scaleDegreePos);
      } else {
        // diminished scale degree
        text(COFNote.scaleDegrees[sdIndex].toLowerCase(),0,scaleDegreePos);
        textSize( 15 );
        text("o",30,scaleDegreePos-10);
        
      }
      popMatrix();
      
    }
  popMatrix();
  
  
  
  
  // OUTLINE
  noFill();
  
  stroke(255, 80);
  strokeWeight( 3 );
  
  // outer arc
  arc( 0, 0, outerArcSize, outerArcSize, -(9*PI)/12, (5*PI)/12);
  
  // inner arc
  arc( 0, 0, innerArcSize, innerArcSize, -(9*PI)/12, (5*PI)/12);
  
  
  // side lines
  pushMatrix();
    //translate(width/2, height / 2);
    rotate(-(3*PI)/12);
    line( 0, -maxSize/2-stepSize * 2, 0, -minSize/2+insideSpace );
    rotate((14*PI)/12);
    line( 0, -maxSize/2-stepSize * 2, 0, -minSize/2+insideSpace );
    
  popMatrix();
  
  
  pushMatrix();
    // tonic indicator
    
    rotate( PI/6 * (currentMode-1));
    stroke( 0 );
    strokeWeight( 5 );
    
    // should be filled to reflect the current mode (major, minor, diminished)
    fill(255);
    ellipse( 0, -(minSize/2) + insideSpace, 18, 18);
    
  popMatrix();
  
  
  popMatrix();
  
  //endDraw();
  
}


void drawBackground() {
  
  
  
  stroke(45);
  strokeWeight( 1 );
  
  noFill();
  ellipseMode(CENTER);
  
  // draw 
  
  float contentSize = (maxSize - minSize);
  float stepSize = contentSize / (octaves);
  for(int i = 0; i < octaves + 1; i++){

    float d = minSize + stepSize * i;
    ellipse( width / 2, height / 2, d, d);
  }
  
  //rect(padding, padding, maxSize, maxSize);
  
  // draw the lines between the notes
  
  for(int j = 0; j < 12; j++){
   pushMatrix();
   translate(width / 2,height/2);
    rotate(PI/6*j + PI/12);
    
    // display the note
    
    line( 0, -maxSize/2, 0, -minSize /2 );
    line( 0, minSize/2, 0, maxSize /2 );
     
   popMatrix();
  }
  
  
  // DRAW NOTATIONS
  
  textAlign( CENTER );
  textSize( 30 );
  
  for(int k = 0; k < 12; k++){
    pushMatrix();
    
    translate(width / 2,height/2);
    rotate(PI/6*k);
    
    // display the note
    if(COFNote.getPosition(currentTonic)   == k) fill(255);
    else                       fill(255,80);
    // dependent on the signature
    //COFNote currentTonicNote = new COFNote( currentTonic );
    // check if we should show flats or sharps
    boolean isFlat = COFNote.isFlatSignature( currentTonic, currentMode );
    
    text( COFNote.getNotation( COFNote.getPosition( k ), isFlat ) , 0, -(minSize / 2)+insideSpace/2+10);
     
   popMatrix();
  }
  
  
}


void noteOnReceived(Note note) {
  
  //println("note on " + note.getPitch());
  
  // update the allNotes array
  int pitch = note.getPitch();

  allNotes[pitch - relativePitch].active = true;
  allNotes[pitch - relativePitch].pressed = true;
  allNotes[pitch - relativePitch].velocity = note.getVelocity();
  allNotes[pitch - relativePitch].timeActive = 0;
  
  
  // can we update the tonic?
  if(tonicEditable){
   currentTonic = pitch;
   drawBackground();
   drawTonicStructure();
  }
  
  redraw();
  
  
}

void reset() {
  // turn all notes off
  for(int i = 0; i< allNotes.length; i++){
    allNotes[i].active = false;
    allNotes[i].pressed = false;
    allNotes[i].timeActive = 0;
      
   }
}

void noteOffReceived(Note note){

  //println("note off " + note.getPitch());
    
  int pitch = note.getPitch();

  if(!sustainActive){
   allNotes[pitch - relativePitch].active = false;
   allNotes[pitch - relativePitch].velocity = 0;
   allNotes[pitch - relativePitch].timeActive = 0;
  }
  
  allNotes[pitch - relativePitch].pressed = false;
  
  
  
  redraw();
}

void sysexReceived(rwmidi.SysexMessage msg) {
  println("sysex " + msg);
}

void controllerChangeReceived(Controller c){
  println("control " + c);
  
  // move on controller value 64 (damper pedal)
  // damper pedal
  if(c.getCC() == 64){
    if(c.getValue() > 67){
      println("Sustain pressed");
      sustainActive = true;
      
    } else {
      println("Sustain released");
      
      sustainActive = false;
      // turn off all sustained notes
      for(int i = 0; i< allNotes.length; i++){
        if(allNotes[i].sustained){ 
           allNotes[i].sustained = false;
        }
        // and turn it off active when not pressed
        if(!allNotes[i].pressed){
          allNotes[i].active = false;
          allNotes[i].timeActive = 0;
        }
      }
    }
    
    redraw();
  }
  
  
  // foor switch for setting the tonic
  if(c.getCC() == footSwitchCC){
    // set the tonic
    if(c.getValue() >= 67){ 
        tonicEditable = true;
        println("START Tonic edit");
        redraw();
    }
    else {
      tonicEditable = false;
      println("STOP Tonic edit");
      redraw();
    }
  }
  
}

void mousePressed() {
  //int ret =    output.sendNoteOn(0, 3, 3);
  //ret = output.sendSysex(new byte[] {(byte)0xF0, 1, 2, 3, 4, (byte)0xF7});
}

void keyPressed(){
  
  // one of the numbers 1-7 pressed
  if(keyCode >= 49 && keyCode <= 55){
    currentMode = keyCode - 49;
    println("Change mode to " + modes[currentMode]);
    
    drawBackground();
    drawTonicStructure();
  
    redraw();
  }
  
  // one of the numbers 1-7 on the numpad pressed
  if(keyCode >= 97 && keyCode <= 103){
    currentMode = keyCode - 97;
     println("Change mode to " + modes[currentMode]);
     
     drawBackground();
     drawTonicStructure();
     redraw();
  }
  
  // switch tonics fast
  // use c-d-e-f-g-a-b for normal notes
  // use C-D-E-F-G-A-B for sharp notes
  if(key == 'c') currentTonic = 0;
  if(key == 'C') currentTonic = 1;
  if(key == 'd') currentTonic = 2;
  if(key == 'D') currentTonic = 3;
  if(key == 'e') currentTonic = 4;
  if(key == 'E') currentTonic = 5;
  if(key == 'f') currentTonic = 5;
  if(key == 'F') currentTonic = 6;
  if(key == 'g') currentTonic = 7;
  if(key == 'G') currentTonic = 8;
  if(key == 'a') currentTonic = 9;
  if(key == 'A') currentTonic = 10;
  if(key == 'b') currentTonic = 11;
  if(key == 'B') currentTonic = 0;
  
  if(key == 'r') reset();
  
  // save a screenshot
  
  if(lastChord != null)
    if(key == 's') saveFrame("mc-screenshot-" + lastChord.getNotationInTonic(currentTonic, currentMode) + "-###.jpg");
  
  // show / hide tonic structure
  if(key == 't') tonicStructureEnabled = !tonicStructureEnabled;
  
  // show / hide info
  if(key == 'i') infoEnabled = !infoEnabled;
  
  // show / hide overtones
  if(key == 'o') overtonesEnabled = !overtonesEnabled;
  
  // show / hide chords
  if(key == TAB) chordsEnabled = !chordsEnabled;
  
  // show / hide the whole interface
  if(key == 'p') interfaceEnabled = !interfaceEnabled;
  
  // show / hide background (notes)
  if(key == 'n') backgroundEnabled = !backgroundEnabled;
  
  
  // lock interface
   if(key == ' ') interfaceLocked = !interfaceLocked;
  
  
  // change a bit of the structure to we can accomodate more of the circle if it's not filled with other info
  if(interfaceEnabled){
    minSize = _minSize;
    maxSize = _maxSize;
  } else {
    minSize = 20;
    maxSize = _maxSize + padding;
  }
  
  
  
  
  redraw();
}

/**
initialize the notes array
**/
void initNotes(){
  
  allNotes = new COFNote[octaves * 12];
  for(int i = 0; i < octaves * 12; i++){
    allNotes[i] = new COFNote( i );
  }
  
  //selectedNotes = new ArrayList<COFNote>();
}

/** UTILITY FUNCTIONS **/

