'use client';
import React from 'react';
import logoSvg from '@/assets/SVG Logo.svg';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/menu-toggle-icon';
import {
	Navbar,
	NavBody,
	MobileNav,
	MobileNavHeader,
	MobileNavMenu,
} from '@/components/ui/resizable-navbar';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
	CodeIcon,
	GlobeIcon,
	LayersIcon,
	UserPlusIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BarChart,
	PlugIcon,
} from 'lucide-react';

export function Header() {
	const [open, setOpen] = React.useState(false);

	const navLabelClass = 'text-xs font-semibold uppercase tracking-[0.2em]';

	const navMegaTriggerClass = cn(
		'bg-transparent h-11',
		navLabelClass,
		'hover:bg-transparent hover:text-[#DC143C] hover:[&_svg]:text-[#DC143C]',
		'data-[state=open]:bg-transparent data-[state=open]:text-[#DC143C] data-[state=open]:[&_svg]:text-[#DC143C]',
		'focus-visible:bg-transparent focus-visible:text-[#DC143C] focus-visible:[&_svg]:text-[#DC143C]',
	);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<Navbar className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<NavBody>
				<div className="grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 md:gap-5 xl:gap-6">
					<a
						href="/"
						className="flex h-11 shrink-0 items-center rounded-md hover:bg-accent"
					>
						<img
							src={typeof logoSvg === 'string' ? logoSvg : logoSvg.src}
							alt="CRUD Site"
							width={171}
							height={62}
							className="h-10 w-auto object-contain"
						/>
					</a>
					<div className="flex min-w-0 justify-center justify-self-center">
					<NavigationMenu className="hidden max-w-full md:flex">
						<NavigationMenuList className="space-x-2 md:space-x-3 xl:space-x-4">
							<NavigationMenuItem>
								<NavigationMenuTrigger className={navMegaTriggerClass}>
									Work
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5 pb-1.5">
									<div className="grid w-lg grid-cols-2 gap-2">
										<ul className="bg-popover space-y-2 rounded-md border p-2 shadow">
											{companyLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-2 p-3">
											{companyLinks2.map((item, i) => (
												<li key={i}>
													<NavigationMenuLink
														href={item.href}
														className="group flex flex-row items-center gap-x-2 rounded-md p-2 hover:bg-accent"
													>
														<item.icon className="size-4 text-foreground transition-colors group-hover:text-[#DC143C]" />
														<span className="font-medium transition-colors group-hover:text-[#DC143C]">
															{item.title}
														</span>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className={navMegaTriggerClass}>
									Services
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-background p-1 pr-1.5">
									<ul
                                        className="bg-popover grid w-lg grid-cols-2 gap-2 rounded-md border p-2 shadow">
										{productLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<div className="p-2">
										<p className="text-muted-foreground text-sm">
											Interested?{' '}
											<a href="#" className="text-foreground font-medium hover:underline">
												Schedule a demo
											</a>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuLink className={cn('px-2 xl:px-4', navLabelClass)} asChild>
								<a href="#" className="flex h-11 items-center rounded-md px-3 hover:bg-accent">
									Pricing
								</a>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
					</div>
				<div className="hidden justify-self-end md:flex">
					<Button
						size="lg"
						className={cn(
							'!rounded-full bg-[#DC143C] px-8 text-white hover:bg-[#b90f33]',
							navLabelClass,
						)}
					>
						Let's Grow
					</Button>
				</div>
				</div>
			</NavBody>

			<MobileNav className="min-h-20">
				<MobileNavHeader>
					<a href="/" className="flex h-11 shrink-0 items-center rounded-md hover:bg-accent">
						<img
							src={typeof logoSvg === 'string' ? logoSvg : logoSvg.src}
							alt="CRUD Site"
							width={171}
							height={62}
							className="h-10 w-auto object-contain"
						/>
					</a>
					<Button
						size="icon"
						variant="outline"
						onClick={() => setOpen(!open)}
						className="size-11"
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label="Toggle menu"
					>
						<MenuToggleIcon open={open} className="size-6" duration={300} />
					</Button>
				</MobileNavHeader>

				<MobileNavMenu
					isOpen={open}
					onClose={() => setOpen(false)}
					className="bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border border-y backdrop-blur-lg dark:bg-neutral-950"
				>
					<div id="mobile-menu" className="flex w-full flex-col gap-6">
						<NavigationMenu className="max-w-full">
							<div className="flex w-full flex-col gap-y-2">
								<span className={cn(navLabelClass, 'text-muted-foreground')}>Product</span>
								{productLinks.map((link) => (
									<ListItem key={link.title} {...link} onNavigate={() => setOpen(false)} />
								))}
								<span className={cn(navLabelClass, 'text-muted-foreground')}>Company</span>
								{companyLinks.map((link) => (
									<ListItem key={link.title} {...link} onNavigate={() => setOpen(false)} />
								))}
								{companyLinks2.map((link) => (
									<ListItem key={link.title} {...link} onNavigate={() => setOpen(false)} />
								))}
							</div>
						</NavigationMenu>
						<Button
							size="lg"
							className={cn(
								'w-full !rounded-full bg-[#DC143C] text-white hover:bg-[#b90f33]',
								navLabelClass,
							)}
						>
							Let's Grow
						</Button>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
}

function ListItem({
	title,
	description,
	icon: Icon,
	className,
	href,
	onNavigate,
	...props
}) {
	return (
		<NavigationMenuLink
			className={cn(
				'w-full flex flex-row gap-x-2 rounded-sm p-2 hover:bg-accent focus:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent',
				'hover:text-accent-foreground focus:text-accent-foreground data-[active=true]:text-accent-foreground',
				className,
			)}
			{...props}
			asChild
		>
			<a
				href={href}
				className="group flex w-full flex-row gap-x-2"
				onClick={() => {
					onNavigate?.();
				}}
			>
				<div className="flex aspect-square size-12 items-center justify-center rounded-md border border-border bg-background/40 shadow-sm transition-colors group-hover:border-[#DC143C]/35 group-hover:text-[#DC143C]">
					<Icon className="size-5 text-foreground transition-colors group-hover:text-[#DC143C]" />
				</div>
				<div className="flex flex-col items-start justify-center">
					<span className="font-medium transition-colors group-hover:text-[#DC143C]">{title}</span>
					<span className="text-muted-foreground text-xs transition-colors group-hover:text-muted-foreground/80">
						{description}
					</span>
				</div>
			</a>
		</NavigationMenuLink>
	);
}

const productLinks = [
	{
		title: 'UI/UX Design',
		href: '#',
		description: 'Design intuitive and user-centered digital experiences',
		icon: LayersIcon,
	},
	{
		title: 'Web Development',
		href: '#',
		description: 'Build fast, scalable, and secure web applications',
		icon: GlobeIcon,
	},
	{
		title: 'App Development',
		href: '#',
		description: 'Create production-ready mobile applications',
		icon: CodeIcon,
	},
	{
		title: 'Software & AI Dev',
		href: '#',
		description: 'Custom SaaS, CRM, ERP and enterprise solutions',
		icon: PlugIcon,
	},
	{
		title: 'Branding & Marketing',
		href: '#',
		description: 'Build strong brands and grow with targeted strategies',
		icon: BarChart,
	},
	{
		title: 'Cybersecurity Solutions',
		href: '#',
		description: 'Secure applications, websites, and digital infrastructure',
		icon: Shield,
	},
];

const companyLinks = [
	{
		title: 'About Us',
		href: '#',
		description: 'Learn more about our story and team',
		icon: Users,
	},
	{
		title: 'Customer Stories',
		href: '#',
		description: 'See how we’ve helped our clients succeed',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '#',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
];

const companyLinks2 = [
	{
		title: 'Case Studies',
		href: '#',
		icon: FileText,
	},
	{
		title: 'Why Choose Us',
		href: '#',
		icon: Leaf,
	},
	{
		title: 'Projects',
		href: '#',
		icon: HelpCircle,
	},
	{
		title: 'Privacy Policy',
		href: '#',
		icon: Shield,
	},
	{
		title: 'Refund Policy',
		href: '#',
		icon: RotateCcw,
	},
	
];
