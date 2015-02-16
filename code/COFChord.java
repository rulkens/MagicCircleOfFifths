/**
  circle of fifths - creates an interactive circle of fifths in processing
  
  Required
  ------------------------
  the rwmidi library (http://ruinwesen.com/support-files/rwmidi.zip)
  
  code by Alexander Rulkens
  rulkens@gmail.com
  http://alexrulkens.com/
  
  please give me credit if you use this code for something
  
  
  Circle of Fifths Chord class
  
**/

/**
	COFChord is a container class for the music Chord element
	
	can be an abstract chord (without a tonic)
	or an implemented chord (with tonic)
**/

import java.util.*;

public class COFChord {
	
	/** Constants describing the different types of chords
	**/
	
	/** TRIADS **/
	
	// Major Triad
        public static final int[] M_notes     = { 0, 4, 7};
        public static final int[] m_notes     = { 0, 3, 7};
        public static final int[] DIM_notes   = { 0, 3, 6};
        public static final int[] AUG_notes   = { 0, 4, 8};
        
        
        
        public static final int[] MAJ7_notes  = { 0, 4, 7, 11};
        public static final int[] m7_notes    = { 0, 3, 7, 10};
        public static final int[] M7_notes    = { 0, 4, 7, 10};
        public static final int[] DIM7_notes  = { 0, 3, 6, 9};
        public static final int[] HDIM7_notes = { 0, 4, 6, 10};
        public static final int[] hdim7_notes = { 0, 3, 6, 10};
        public static final int[] mM7_notes   = { 0, 3, 7, 11};
        
        public static final int[] M9_notes    = { 0, 2, 4, 7, 10 };
        public static final int[] m9_notes    = { 0, 2, 3, 7, 10 };
        public static final int[] Madd9_notes = { 0, 2, 4, 7 };
        public static final int[] madd9_notes = { 0, 2, 3, 7 };
        public static final int[] MAJ9_notes  = { 0, 2, 4, 7, 11 };
        
        public static final int[] sus2_notes   = { 0, 2, 7};
        public static final int[] sus4_notes   = { 0, 5, 7};
        
        public static final int[] M69_notes    = { 0, 2, 4, 7, 9 };
        
        // Triads of partial chords
        public static final int[] MAJ7_p_notes  = { 0, 4, 11};
        public static final int[] m7_p_notes    = { 0, 3, 10};
        public static final int[] M7_p_notes    = { 0, 4, 10};
        
        
        
	public static final COFChord M 		= 	new COFChord( "", 	COFChord.M_notes, "major" );
	// Minor Triad
	public static final COFChord m 		= 	new COFChord( "m", 	COFChord.m_notes, "minor" );
	// Diminished Major Triad (b5)
	public static final COFChord DIM 	= 	new COFChord( "b5", 	COFChord.DIM_notes, "diminished" );
	// Augmented Major Triad (#5)
	public static final COFChord AUG 	= 	new COFChord( "aug", 	COFChord.AUG_notes, "augmented" );
	
	/** SEVENTHS **/
	// Major Seventh
	public static final COFChord MAJ7 	= 	new COFChord( "maj7", 	COFChord.MAJ7_notes, "major 7th" );
	// Minor Seventh
	public static final COFChord m7 	= 	new COFChord( "m7", 	COFChord.m7_notes, "minor 7th" );
	// Dominant seventh
	public static final COFChord M7 	= 	new COFChord( "7", 	COFChord.M7_notes, "7th" );
	// Diminished seventh
	public static final COFChord DIM7 	= 	new COFChord( "o", 	COFChord.DIM7_notes, "diminished 7th" );
	// Half Diminished seventh major
	public static final COFChord HDIM7 	= 	new COFChord( "b5", 	COFChord.HDIM7_notes, "half diminished" );
        // Half Diminished seventh minor
	public static final COFChord hdim7 	= 	new COFChord( "dim", 	COFChord.hdim7_notes, "half diminished" );
	// Minor Major seventh
	public static final COFChord mM7 	= 	new COFChord( "mM7", 	COFChord.mM7_notes, "minor major 7th" );
	
	/** COLOUR CHORDS **/
	
	// NINTHS
	// Major Ninth
	public static final COFChord MAJ9 	= 	new COFChord( "maj9", 	COFChord.MAJ9_notes, "major 9th" );
        // Minor Ninth
	public static final COFChord m9 	= 	new COFChord( "m9", 	COFChord.m9_notes, "minor 9th" );
	// Dominant Ninth
	public static final COFChord M9 	= 	new COFChord( "9", 	COFChord.M9_notes, "9th" );
	// Major added Ninth
	public static final COFChord Madd9 	= 	new COFChord( "add9", 	COFChord.Madd9_notes, "major add 9th" );
        // Minor added Ninth
	public static final COFChord madd9 	= 	new COFChord( "m add9", COFChord.madd9_notes, "minor add 9th" );

	// ELEVENTHS
	
        // SIXTHS
        
        
	// SUSPENDED
	// Suspended 2nd
	public static final COFChord sus2 		= 	new COFChord( "sus2", 	COFChord.sus2_notes, "suspended 2nd" );
	// Suspended 4th
	public static final COFChord sus4 		= 	new COFChord( "sus4", 	COFChord.sus4_notes, "suspended 4nd" );
	// sus 4th
	
	
	// AUGMENTED
	
	
	// other
	
	// 6-9 chord (for endings and stuff)
	public static final COFChord M69 		= 	new COFChord( "69", 	COFChord.M69_notes, "six nine" );

	// partial Triads (without fifth)
	public static final COFChord MAJ7_p 		= 	new COFChord( "maj7-5", COFChord.MAJ7_p_notes, "major 7th (-5th)" );
	public static final COFChord m7_p 		= 	new COFChord( "m7-5", 	COFChord.m7_p_notes, "minor 7th (-5th)" );
	public static final COFChord M7_p 		= 	new COFChord( "7-5", 	COFChord.M7_p_notes, "7th (-5th)" );


        // CHORD ARRAY - in order of likeliness to occur
        public static final COFChord[] westernChords = {  COFChord.M,
                                                          COFChord.m,
                                                          COFChord.M7,
                                                          COFChord.DIM,
                                                          COFChord.AUG,
                                                          COFChord.MAJ7,
                                                          COFChord.m7,
                                                          COFChord.sus2,
                                                          COFChord.sus4,
                                                          COFChord.DIM7,
                                                          COFChord.HDIM7,
                                                          COFChord.hdim7,
                                                          COFChord.mM7,
                                                          COFChord.MAJ9,
                                                          COFChord.m9,
                                                          COFChord.M9,
                                                          COFChord.Madd9,
                                                          COFChord.madd9,
                                                          COFChord.M69,
                                                          COFChord.MAJ7_p,
                                                          COFChord.m7_p,
                                                          COFChord.M7_p
                                                        };
        
	
	// the musical notation for this chord
	public String notation;
	
	// all the seminotes 
	public int[] notes;
	public String longNotation;
	public int tonic;
	
	public boolean isAbstract;
	
	
	/* constructor - abstract */
	public COFChord( String notation, int[] notes, String longNotation ){
		this.notation = notation;
		this.notes = notes;
		this.longNotation = longNotation;
		
		isAbstract = true;
	}
	
	/* constructor - implemented */
	public COFChord( String notation, int[] notes, String longNotation, int tonic ){
		this.notation = notation;
		this.notes = notes;
		this.longNotation = longNotation;
		
		this.tonic = tonic;
		
		isAbstract = true;
	}
	
	
	
	public int[] getInTonic( int tonic ){
		// transpose the chord to the given tonic
		
		// and return the notes	
		
		return new int[3];
	}

        public String getNotationInTonic( int superTonic, int mode ) {
          return COFNote.getNotation(tonic, COFNote.isFlatSignature( superTonic, mode ) ) + "" + notation;
        }
	
	
	/** calculates the difference between two chords
		returns 0 if the chords are the same
		higher numbers indicate more difference
	**/
	public int difference( COFChord chord){
		return 0;
	}
	
	public boolean isTriad(){
		return notes.length == 3;
	}
	
	
	public boolean isMajor(){
		// is one of the major chords?
		
		return false;
	}
	
	public boolean isMinor(){
		// is a minor chord?
		
		return false;
	}
	
	public boolean isDiminished(){
		// is a diminished chord?
		
		return false;
	}
	
	/**
		tries to find chords that fit the tonic 
		and orders them based on the best matches
		
		- more logical chords first
		- fancy chords last
		
		we assume someone keeps playing in the 
	**/
	public static COFChord[] findChords( int tonic, Integer[] selectedNotes){
	  
  
          COFChord[] outputChords = new COFChord[2];
          ArrayList<COFChord> matches = new ArrayList<COFChord>();
          
          // find the chords based on heuristics
          
          /* go down the circle of fifths to 
            find chords that are likely to happen
          */
          for(int i = 0; i < 12; i++){
            // get the positions
            int currentTonic = COFNote.cofPosition[(tonic + i + 11) % 12];
            
            
            
            List<Integer> translatedNotes = new ArrayList<Integer>();
            // translate the chord to the current tonic
            for(int n = 0; n < selectedNotes.length; n++){
              
              translatedNotes.add( (12 + selectedNotes[n] - currentTonic)%12 );
            }
            
            
            //System.out.println(" Translated notes: " + translatedNotes );
            
            // order the translated notes
            Collections.sort(translatedNotes);
            
            Set<Integer> translatedSet = new HashSet<Integer>(translatedNotes);
            
            
            Integer[] translatedNotesArray;
            translatedNotesArray = new Integer[translatedSet.size()];
            translatedNotesArray = translatedSet.toArray(translatedNotesArray);
            
            
            
            // loop through the chords and check out the ones that match
            
            //System.out.println(" Translated notes: " + translatedNotesArray.length + " in " + COFNote.getNotation( currentTonic ) );
            
            int[] notes = new int[translatedNotesArray.length];
            for( int j = 0; j < notes.length; j++){
              notes[j] = (int)translatedNotesArray[j].intValue();
              //System.out.print(" - : " + (int)notes[j] );
            }
            
            //System.out.println(" ");
            
            //System.out.println(" Translated notes: " + notes );
            
            
            
            for(int k = 0; k < westernChords.length; k++ ){
              
              // loop through all the chords and find the best suitable match
              
              COFChord currentChord = (COFChord) COFChord.westernChords[k];
              
              
              // don't bother looking for a match if the length is not the same
              if(!(currentChord.notes.length == notes.length)) continue;
              
              //currentChord.tonic = currentTonic;
              
               boolean isMatch = Arrays.equals(currentChord.notes, notes);
               
               if(isMatch) {
                 // add it to list
                 COFChord c = new COFChord(  currentChord.notation, 
                                             currentChord.notes, 
                                             currentChord.longNotation, 
                                             currentTonic ) ;
                 
                 matches.add( c );
                 System.out.println("   -> match found! " +  COFNote.getNotation(currentTonic) + " " + currentChord.notation);
               }
               
               
              
            }
          }
          
         //if( matches.size() > 0 ) System.out.println(" Translated notes: " + matches.size() );
         outputChords = new COFChord[matches.size()];
               // convert matches arraylist to something useful
         outputChords = (COFChord[])matches.toArray(outputChords);
            
            
          return outputChords;
	}
	
	
}
