using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseAPIController
    {
        public StoreContext _context { get; }
        public BasketController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return basket;
        }

        [HttpPost] // values from query string. Ex. api/basket?productId=3&quantity=1
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get basket || create basket
            var basket = await RetrieveBasket();
            if (basket != null) basket = CreateBasket();
            //get product
            var product = await _context.Products.FindAsync(productId);
            if(product == null) return NotFound();
            //add item
            basket.AddItem(product, quantity);
            //save changes
            var resluts = await _context.SaveChangesAsync() > 0;
            if(resluts) return StatusCode(201);

            return BadRequest(new ProblemDetails{Title = "Proble saving item to basket"});
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemBasket(int productId, int quantity)
        {
            ///get basket
            var basket = await _context.Baskets.FirstOrDefaultAsync(b => b.BuyerID == Request.Cookies["buyerId"]);
            //
            //remove item or reduce quantity
            if (basket != null)
                basket.RemoveItem(productId, quantity);
            //save changes
            return StatusCode(201);
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                            .Include(i => i.Items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(x => x.BuyerID == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            //generates a random string. unique key
            var buyerId = Guid.NewGuid().ToString();
            //Cookies are needed to run the app. So this makes it essential and expires in 30 days from creation.
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            //Inside controllers we have access to Response
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket{BuyerID = buyerId};
            //Entity framwork will start to track basket
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}