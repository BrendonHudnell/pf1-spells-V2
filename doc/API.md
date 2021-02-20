**Spell Search**
----
  Fetches a JSON object of all the spells in Pathfinder 1st Edition

* **URL**

  /api/spellSearch

* **Method**
  
  `GET`
  
* **URL Params**

  **Optional**
 
  * `searchString=[alphanumeric]`
   
  * `spellResistance=[boolean]`
   
  * <details>
    <summary>Class filters</summary><br>
      
    `alchemist=[true]`
   
    `antipaladin=[true]`
   
    `arcanist=[true]`
   
    `bard=[true]`
   
    `bloodrager=[true]`
   
    `cleric=[true]`
   
    `druid=[true]`
   
    `hunter=[true]`
   
    `inquisitor=[true]`
   
    `investigator=[true]`
   
    `magus=[true]`
   
    `medium=[true]`
   
    `mesmerist=[true]`
   
    `occultist=[true]`
   
    `oracle=[true]`
   
    `paladin=[true]`
   
    `psychic=[true]`
   
    `ranger=[true]`
   
    `shaman=[true]`
   
    `skald=[true]`
   
    `sorcerer=[true]`
   
    `spiritualist=[true]`
   
    `summoner=[true]`
   
    `summoner_unchained=[true]`
   
    `witch=[true]`
   
    `wizard=[true]`
  </details>
  
  * <details>
    <summary>Saving throw filters</summary><br>
  
    `fortitude=[true]`
   
    `reflex=[true]`
   
    `will=[true]`
   
    `none=[true]`
  </details>
   
  * <details>
    <summary>Spell level filters</summary><br>
      
    `0th=[true]`
   
    `1st=[true]`
   
    `2nd=[true]`
    
    `3rd=[true]`
   
    `4th=[true]`
   
    `5th=[true]`
   
    `6th=[true]`
   
    `7th=[true]`
   
    `8th=[true]`
   
    `9th=[true]`
  </details>

* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** 
    ```
    [
      {
        "spell_name":"Spell Name",
        "description_formatted":"HTML formatted spell description",
        "short_description":"Short, one-line description of the spell. May be null",
        "spell_level":"Spell level for each class that can cast it. ex: cleric 2, sorcerer/wizard 1",
        "saving_throw":"Saving throw for the spell. May be null",
        "spell_resistance":"If the spell is affected by spell resistance. May be null"
      },
      ...
    ]
    ```

* **Error Response:**

  * **For parameters with illegal values:**

    **Code:** 400 <br />
    **Content:**
    ```
    {
      ok: false,
      status: 400,
      error: [
        {
          keyword: "enum",
          dataPath: "/query/<parameterName>",
          schemaPath: "#/properties/query/properties/<parameterName>/enum",
          params: {
            allowedValues: [
              "true",
              "false"
            ]
          },
          message: "should be equal to one of the allowed values"
        }
      ]
    }
    ```

  * **For illegal parameters:**

    **Code:** 400 <br />
    **Content:**
    ```
    {
      ok: false,
      status: 400,
      error: [
        {
          keyword: "additionalProperties",
          dataPath: "/query",
          schemaPath: "#/properties/query/additionalProperties",
          params: {
            additionalProperty: "<parameterName>"
          },
          message: "should NOT have additional properties"
        }
      ]
    }
    ```

* **Sample Call:**

  Search for 5th level wizard or cleric spells containing "magic" that targets a will save and doesnt have spell resistance:

  `api/spellsearch?searchString=warrior&wizard=true&cleric=true&5th=true&spellResistance=false&will=true`
  
  returns one spell: Mantle of the Magic Warriors 

* **Notes:**

  Currently class, saving throw, and spell level filters can only be set to true. False values will be ignored. 
