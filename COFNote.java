/**
  circle of fifths - creates an interactive circle of fifths in processing
  
  Required
  ------------------------
  the rwmidi library (http://ruinwesen.com/support-files/rwmidi.zip)
  
  code by Alexander Rulkens
  rulkens@gmail.com
  http://alexrulkens.com/
  
  please give me credit if you use this code for something
  
  
  Circle of Fifths Note class
  
**/

/**

COFNote is a class that gives you some info about a note in the circle of fifths

**/
class COFNote {
	
	/*
		arrays describing all the semitones in Western music, starting with C 
	*/
	public static final String[] flatNames =     { "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"};
	public static final String[] sharpNames =    { "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"};

	public static final String[] scaleDegrees =  { "IV", "I", "V", "II", "VI","III","VII"};
	
	// position of the note on the circle of Fifths.
	// we could calcualte this, but I'm lazy :)
	public static final  int[] cofPosition =     { 0,    7,    2,    9,   4,   11,  6,    1,   8,    3,   10,   5};
	//public static final  int[] cofPosition =     { 0,    1,    2,    3,   4,   5,  6,    7,   8,    9,   10,   11};

        public static final  int[] signatures =      { 0,   -5,    2,   -3,   4,   -1,  6,    1,  -4,    3,   -2,   5};

        // overtones - first 9 harmonics. This should be enough, right?
        public static final  int[] overtones =       { 12,  19,  24,  28,  31,  34,  36,  38 };
	
	// for use of building the circle itself
	
	private int midiNote = 0;
	
	// is the note active?
        public boolean active = false;
        // is the note pressed?
        public boolean pressed = false;
        // is the note systained?
        public boolean sustained = false;
        
	public int velocity = 0;
        // the time this note is active in milliseconds
	public int timeActive = 0;
        
        // used for fading out
        public int timeNotActive = 0;
	
	/**
		constructor
		you can set the midi note that is played
	**/
	public COFNote( int note ){
		midiNote = note;
	}
	
	/** 
		STATIC METHODS
	**/

	public static String getNotation( int note){
		return COFNote.getNotation( note, false );
	}

	public static String getNotation( int note , boolean flat){
		// get the notation based on the note
		if(flat) return COFNote.flatNames[ note % 12 ];
		else	 return COFNote.sharpNames[ note % 12 ];	
	}
	
	/** the octave the note is in **/
	public static int getOctave( int note ){
		return (int)(note/12);
	}
	
        /*
	public static int getSignature( int note ) {
		return COFNote.signatures[ note % 12 ];
	}*/

        public static int getSignature( int note, int mode ) {
		return COFNote.signatures[ (12 + note + (mode-1)*5) % 12 ];
	}

	public static boolean isFlatSignature( int note, int mode ) {
		return COFNote.signatures[ (12 + note + (mode-1)*5) % 12 ] <= 0;
	}

	
	/** return the position on the circle of fifths, counting from C = 0
	**/
	public static int getPosition( int note ){
		return COFNote.cofPosition[ note % 12 ];
	}
	
	
	/** 
		PUBLIC METHODS
	**/
	
	/**
		set midi note manually
	**/
	public void setMidi( int number ){
		midiNote = number;
	}

	/**
		get midi note
	**/
	public int getMidi(  ){
		return midiNote;
	}

	
	/**
		get the name of the note in musical notation
		
		@flat : true if the note should be shown with flats
		
	**/
        public String getNotation () {
          return getNotation( false );
        }
        
	public String getNotation( boolean flat){
		// get the notation based on the note
		if(flat) return COFNote.flatNames[ midiNote % 12 ];
		else	 return COFNote.sharpNames[ midiNote % 12 ];
	}
	
	/** the octave the note is in **/
	public int getOctave( ){
		return (int)(midiNote/12);
	}
	
	/** return the key signature
		encoded as an integer
		- is flats, + is sharps
		so, -3 = bbb
		4 = ####
	**/
	public int getSignature( ) {
		return COFNote.signatures[ midiNote % 12 ];
	}

	public int getSignature( int mode ) {
		return COFNote.signatures[ (12 + midiNote + (mode-1)*5) % 12 ];
	}



	
	/** return the position on the circle of fifths, counting from C = 0
	**/
	public int getPosition( ){
		return COFNote.cofPosition[ midiNote % 12 ];
	}
	
}
