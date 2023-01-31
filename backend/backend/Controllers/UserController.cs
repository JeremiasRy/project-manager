using DataAccess.Data;
using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IPasswordHasher<SignInCredentials> _hasher = new PasswordHasher<SignInCredentials>();
    [HttpGet]
    public async Task<IResult> GetUsers([FromServices] IUserData data)
    {
        try
        {
            return Results.Ok(await data.GetUsers());
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [HttpGet("{id}")]
    public async Task<IResult> GetUser([FromServices] IUserData data, [FromRoute] int id)
    {
        try
        {
            return Results.Ok(await data.GetUser(id));
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    [AllowAnonymous]
    [HttpPost("/login")]
    public async Task<IResult> Login([FromServices] IUserData data, [FromBody] SignInCredentials user)
    {
        string? username = user.Username;
        string? password = user.Password;

        if (username is not null && password is not null)
        {
            var userFromDb = await data.GetUser(username);
            if (userFromDb == null)
            {
                return Results.Problem($"Couldn't find user {username} from database");
            }
            if (_hasher.VerifyHashedPassword(user, userFromDb.Password, password) == PasswordVerificationResult.Success)
            {
                var token = GenerateToken(username);
                return Results.Ok(new { Access_token = token, User = userFromDb });
            }
            else
            {
                return Results.Problem("Incorrect password");
            }
        }
        else
        {
            return Results.Problem("Invalid information for login check username and password");
        }
    }
    [AllowAnonymous]
    [HttpPost("/register")]
    public async Task<IResult> Register([FromServices] IUserData data, [FromBody] SignInCredentials user)
    {
        string passwordHash = _hasher.HashPassword(user, user.Password);
        user.Password = passwordHash;
        try
        {
            await data.InsertUser(user);
            return Results.Ok(user.Username);
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }
    private string GenerateToken(string username)
    {
        string? key = _config["Jwt:Key"];
        if (key == null)
        {
            throw new Exception("Key was not set to anything");
        }
        var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, username)
            }),

            Expires = DateTime.Now.AddMinutes(30),
            SigningCredentials = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha256Signature),
            Audience = _config["Jwt:Audience"],
            Issuer = _config["Jwt:Issuer"]
        };
        var stoken = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(stoken);
    }
    public UserController(IConfiguration config)
    {
        _config = config;
    }
}
