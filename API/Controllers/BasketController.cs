using API.Data;
using API.DTOs;
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

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }

        [HttpPost] // values from query string. Ex. api/basket?productId=3&quantity=1
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            //get basket || create basket
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            //get product
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            //add item
            basket.AddItem(product, quantity);
            //save changes
            var resluts = await _context.SaveChangesAsync() > 0;
            if (resluts) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails { Title = "Proble saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItemBasket(int productId, int quantity)
        {
            ///get basket
            var basket = await RetrieveBasket();
            //
            //remove item or reduce quantity
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quantity);
            //save changes
            var resluts = await _context.SaveChangesAsync() > 0;
            if (resluts) return Ok();
            return BadRequest(new ProblemDetails { Title = "Proble removing item from basket" });
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
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            //Inside controllers we have access to Response
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerID = buyerId };
            //Entity framwork will start to track basket
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.id,
                BuyerID = basket.BuyerID,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}