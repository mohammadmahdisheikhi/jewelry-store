import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import ProductCard from "@/components/ProductCard"

export default function Home ():JSX.Element {
    return (
        <>
            <Navbar />
            <Carousel />
            <div className="my-16 mx-4 md:mx-8 lg:mx-20">
                <div className="my-6 flex justify-between">
                    <h3 className="font-extrabold text-2xl md:text-3xl text-secondary">
                        آخرین آگهی‌ها
                    </h3>
                    <a href='/ads' className="text-secondary">
                        مشاهده همه
                    </a>
                </div>
                <div className="flex lg:grid lg:grid-cols-2 overflow-x-auto gap-4">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
            <div className="md:flex my-10 p-4 md:p-8 lg:px-20 bg-primary h-auto md:space-x-8">
                <div className="hidden md:w-1/2">
                    <img src="/image1.png" alt=""></img>
                </div>
                <div className="md:w-1/2">
                    <div className="space-y-2">
                        <h3 className="font-extrabold text-font-extrabold text-2xl md:text-3xl text-secondary">
                            درباره تهران گلد
                        </h3>
                        <p className="font-light text-gray-800">
                            اولین پلتفرم خرید و فروش مستقیم طلای دست دوم. در این پلتفرم تمامی آگهی‌دهندگان و خریداران احراز هویت شده و تمام طلاهای آگهی شده دارای فاکتور خرید معتبر هستند تا امنیت خرید شما تضمین شود.
                        </p>
                    </div>
                </div>
                <div className="md:w-1/2 my-8">
                    <img src="/image1.png" alt=""></img>
                </div>
            </div>

            <div className="text-center md:flex gap-4 my-16 mx-4 md:mx-8 lg:mx-20 md:justify-evenly space-y-4 md:space-y-0">
                <div className="md:w-1/3 p-4 bg-white shadow-md border-[1.25px] border-primary">
                    <div>
                        <img src="" alt=""></img>
                    </div>
                    <h3 className="font-extrabold text-lg text-secondary mb-2">
                         کاغذ خرید اجباری                      
                    </h3>
                    <p className="font-light text-sm text-gray-800">
                        به منظور اطمینان از صحت خرید و فروش طلاها، هنگام ثبت آگهی درخواست بارگذاری فاکتور خرید می‌شود.
                    </p>
                </div>
                <div className="md:w-1/3 p-4 bg-white shadow-md border-[1.25px] border-primary ">
                    <div>
                        <img src="" alt=""></img>
                    </div>
                    <h3 className="font-extrabold text-lg text-secondary mb-2">
                        احراز هویت کاربران
                    </h3>
                    <p className="font-light text-sm text-gray-800">
                        تمامی کاربران، در هنگام ثبت نام احراز هویت می‌شوند.
                    </p>
                </div>
                <div className="md:w-1/3 p-4 bg-white shadow-md border-[1.25px] border-primary ">
                    <div>
                        <img src="" alt=""></img>
                    </div>
                    <h3 className="font-extrabold text-lg text-secondary mb-2">
                        ایمنی تراکنش‌ها
                    </h3>
                    <p className="font-light text-sm text-gray-800">
                        این پلتفرم به عنوان واسطه تراکنش‌هاعمل می‌کند و پس از تحویل طلا به خریدار، پول یه حساب فروشنده منتقل می‌شود. 
                    </p>
                </div>
            </div>

            <div className="text-center my-16">
                <h3 className="font-extrabold text-2xl md:text-3xl text-secondary mb-2">
                    تهران گلد
                </h3>
                <p className="text-gray-800 mb-6">
                    همین حالا حساب کاربری خود را بسازید.
                </p>
                <a href="/login" className="bg-button hover:bg-buttonHover text-white px-6 py-2">ثبت نام</a>
            </div>

            <div className="lg:flex lg:justify-between px-4 md:px-8 lg:px-[90px] py-6 bg-primary space-y-6">
				<div className="lg:w-3/12 mt-6">
					<h6 className="text-2xl font-bold text-gray-800 mb-4">
						تهران گلد				
					</h6>
					<p className="text-sm text-gray-800">
                        اولین پلتفرم خرید و فروش طلای دست دوم به صورت مستقیم
					</p>
				</div>
				<div className="lg:w-3/12">
					<h6 className="text-gray-800 font-bold text-2xl mb-4">
                    دسترسی سریع 
					</h6>
						<li className="list-none"><a className="text-gray-800 text-sm">ورود و ثبت نام</a></li>
						<li className="list-none"><a className="text-gray-800 text-sm">همه آگهی‌ها</a></li>
						<li className="list-none"><a className="text-gray-800 text-sm">داشبورد شخصی</a></li>
						<li className="list-none"><a className="text-gray-800 text-sm">علاقه‌مندی‌ها</a></li>
						
				</div>
				{/*<div className="lg:w-3/12">
					<h6 className="text-gray-800 font-bold text-2xl mb-4">
						دسترسی سریع
					</h6>
					<li className="list-none"><a className="text-gray-800 text-sm">خانه</a></li>
					<li className="list-none"><a className="text-gray-800 text-sm">آموزش آنلاین</a></li>
					<li className="list-none"><a className="text-gray-800 text-sm">نرم افزار آموزشی</a></li>
					<li className="list-none"><a className="text-gray-800 text-sm">درباره ما</a></li>
					<li className="list-none"><a className="text-gray-800 text-sm">تماس با ما</a></li>
				</div>*/}
				<div className="lg:w-3/12">
					<h6 className="text-gray-800 font-bold text-2xl mb-4">
						ارتباط با ما
					</h6>
					<p className="text-gray-800 text-sm">
						آدرس: تهران، خیابان شماره یک، کوچه شماره 2، پلاک 123
					</p>
					<p className="text-gray-800 text-sm">
						شماره تلفن: 021 - 222456111
					</p>
				</div>
			</div>
			
			<div className="text-center text-xs text-gray-800 bg-primary p-4 border-t border-t-gray-400">
				<p>
				© تمامی حقوق متعلق به پلتفرم تهران گلد است..
				</p>
			</div>
        </>
    );
}