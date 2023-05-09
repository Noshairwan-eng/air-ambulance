export class Token
{
    constructor()
    {}

    GetTokenObject()
    {
        var UserObject;
        var token = "";
        var UserString = localStorage.getItem("USER");
        if(UserString!=null)
        {
            UserObject = JSON.parse(UserString);
            token = UserObject.token;
        }                
        return {token:token};
    }   
}