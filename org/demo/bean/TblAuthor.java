/*
 * Java bean class for entity table tbl_author 
 * Created on 1 Aug 2017 ( Date ISO 2017-08-01 - Time 21:57:01 )
 * Generated by Telosys Tools Generator ( version 2.1.1 )
 */

package org.demo.bean;

import java.io.Serializable;


/**
 * Entity bean for table "tbl_author"
 * 
 * @author Telosys Tools Generator
 *
 */
public class TblAuthor implements Serializable
{
    private static final long serialVersionUID = 1L;

    private Integer    authorid     ; // Primary Key

    private String     authorname   ;

    /**
     * Default constructor
     */
    public TblAuthor()
    {
        super();
    }
    
    //----------------------------------------------------------------------
    // GETTER(S) & SETTER(S) FOR THE PRIMARY KEY 
    //----------------------------------------------------------------------
    /**
     * Set the "authorid" field value
     * This field is mapped on the database column "authorId" ( type "INT", NotNull : true ) 
     * @param authorid
     */
	public void setAuthorid( Integer authorid )
    {
        this.authorid = authorid ;
    }
    /**
     * Get the "authorid" field value
     * This field is mapped on the database column "authorId" ( type "INT", NotNull : true ) 
     * @return the field value
     */
	public Integer getAuthorid()
    {
        return this.authorid;
    }

    //----------------------------------------------------------------------
    // GETTER(S) & SETTER(S) FOR DATA FIELDS
    //----------------------------------------------------------------------
    //--- DATABASE MAPPING : authorName ( VARCHAR ) 
    /**
     * Set the "authorname" field value
     * This field is mapped on the database column "authorName" ( type "VARCHAR", NotNull : true ) 
     * @param authorname
     */
    public void setAuthorname( String authorname )
    {
        this.authorname = authorname;
    }
    /**
     * Get the "authorname" field value
     * This field is mapped on the database column "authorName" ( type "VARCHAR", NotNull : true ) 
     * @return the field value
     */
    public String getAuthorname()
    {
        return this.authorname;
    }


    //----------------------------------------------------------------------
    // toString METHOD
    //----------------------------------------------------------------------
    public String toString() { 
        StringBuffer sb = new StringBuffer(); 
        sb.append(authorid);
        sb.append("|");
        sb.append(authorname);
        return sb.toString(); 
    } 


}