import { useEffect, useState } from 'react'
import {
	FaCode,
	FaEnvelope,
	FaFolder,
	FaHome,
	FaMapMarkerAlt,
	FaPhone,
	FaServer,
	FaTools,
	FaUser,
} from 'react-icons/fa'
import './App.css'

function App() {
	// Remove darkMode state since we only want one mode
	// Apply dark mode by default
	useEffect(() => {
		document.body.classList.add('dark-mode')
	}, [])

	// Form state
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState(null)

	// Mobile nav toggle
	const [menuOpen, setMenuOpen] = useState(false)

	// Telegram bot configuration
	const BOT_TOKEN = '8107816169:AAGDjteEUl3cK0nJzf8xCDH4jt3MNXRNbbQ'
	const CHAT_ID = '5834939103'

	const scrollToSection = sectionId => {
		const section = document.getElementById(sectionId)
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' })
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus(null)

		try {
			// Format the message for Telegram
			const message = `
Yangi xabar Portfolio veb-saytidan!

Ism: ${formData.name}
Email: ${formData.email}
Mavzu: ${formData.subject}

Xabar:
${formData.message}
      `.trim()

			// Send message to Telegram bot
			const response = await fetch(
				`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						chat_id: CHAT_ID,
						text: message,
					}),
				}
			)

			if (response.ok) {
				setSubmitStatus({
					type: 'success',
					message: 'Xabaringiz muvaffaqiyatli yuborildi!',
				})

				// Auto-hide success message after 5 seconds
				setTimeout(() => {
					setSubmitStatus(null)
				}, 5000)

				// Reset form
				setFormData({
					name: '',
					email: '',
					subject: '',
					message: '',
				})
			} else {
				throw new Error('Xabar yuborishda xatolik yuz berdi')
			}
		} catch (error) {
			setSubmitStatus({
				type: 'error',
				message:
					"Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.",
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<div className='app dark'>
			{/* Header */}
			<header className='header'>
				<div className='container'>
					<h1 className='logo'>Javohir Fozilov</h1>
					<button
						className='menu-toggle'
						aria-label='Toggle menu'
						onClick={() => setMenuOpen(prev => !prev)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<nav className={`nav ${menuOpen ? 'open' : ''}`}>
						<ul>
							<li>
								<a
									onClick={() => {
										scrollToSection('home')
										setMenuOpen(false)
									}}
								>
									<FaHome /> Bosh sahifa
								</a>
							</li>
							<li>
								<a
									onClick={() => {
										scrollToSection('about')
										setMenuOpen(false)
									}}
								>
									<FaUser /> Men haqimda
								</a>
							</li>
							<li>
								<a
									onClick={() => {
										scrollToSection('skills')
										setMenuOpen(false)
									}}
								>
									<FaCode /> Ko'nikmalar
								</a>
							</li>
							<li>
								<a
									onClick={() => {
										scrollToSection('projects')
										setMenuOpen(false)
									}}
								>
									<FaFolder /> Loyihalar
								</a>
							</li>
							<li>
								<a
									onClick={() => {
										scrollToSection('contact')
										setMenuOpen(false)
									}}
								>
									<FaEnvelope /> Aloqa
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>

			{/* Hero Section */}
			<section id='home' className='hero'>
				<div className='container'>
					<div className='hero-content'>
						<div className='profile-text-container'>
							<h2
								className='profile-text'
								onClick={() =>
									window.open('https://t.me/RootDev2010', '_blank')
								}
							>
								Profil
							</h2>
						</div>
						<h2 className='hero-title'>Javohir Fozilov</h2>
						<h3 className='hero-subtitle'>Full Stack Dasturchi</h3>
						<p className='hero-description'>
							Men zamonaviy veb-ilovalar yaratish bo'yicha mutaxassism. Tezkor,
							qulay va jo'shqin foydalanuvchi interfeyslarini yarataman.
						</p>
						<div className='hero-buttons'>
							<a
								onClick={() => scrollToSection('projects')}
								className='btn primary'
							>
								Mening ishlarim
							</a>
							<a
								onClick={() => scrollToSection('contact')}
								className='btn secondary'
							>
								Bog'lanish
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id='about' className='about'>
				<div className='container'>
					<h2 className='section-title'>Men haqimda</h2>
					<div className='about-content'>
						<div className='about-text'>
							<p>
								Assalomu alaykum! Men Javohir Fozilov, Full‑Stack dasturchiman.
								ProX akademiyasida o'qiyman, zamonaviy texnologiyalar yordamida
								muammolarga amaliy va samarali yechimlar yarataman.
							</p>
							<p>
								Maqsadim — foydalanuvchilar hayotini osonlashtiradigan,
								ishonchli va kengaytiriladigan web‑saytlar va ilovalar yaratish.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Skills Section */}
			<section id='skills' className='skills'>
				<div className='container'>
					<h2 className='section-title'>Mening ko'nikmalarim</h2>
					<div className='skills-grid'>
						<div className='skill-card'>
							<h3>
								<FaCode /> Frontend
							</h3>
							<ul>
								<li>HTML5 & CSS3</li>
								<li>JavaScript (ES6+)</li>
								<li>React.js</li>
								<li>Responsive Dizayn</li>
							</ul>
						</div>
						<div className='skill-card'>
							<h3>
								<FaServer /> Backend
							</h3>
							<ul>
								<li>Node.js</li>
								<li>Express.js</li>
								<li>Server Management</li>
								<li>API Integration</li>
							</ul>
						</div>
						<div className='skill-card'>
							<h3>
								<FaTools /> Asboblar
							</h3>
							<ul>
								<li>Git & GitHub</li>
								<li>Webpack</li>
								<li>Docker</li>
								<li>VS Code</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section id='projects' className='projects'>
				<div className='container'>
					<h2 className='section-title'>Mening loyihalarim</h2>
					<div className='projects-grid'>
						<div className='project-card'>
							<h3>Shirinliklar olami</h3>
							<p>Optom shirinliklar</p>
							<div className='project-tags'>
								<span>React</span>
								<span>Node.js</span>
								<span>MongoDB</span>
							</div>
							<div className='project-link'>
								<a
									href='https://shirinliklarrolami-uz.onrender.com'
									target='_blank'
									rel='noopener noreferrer'
									className='btn primary'
								>
									Saytni ochish
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id='contact' className='contact'>
				<div className='container'>
					<h2 className='section-title'>Bog'lanish</h2>
					<div className='contact-content'>
						<p className='contact-intro'>
							Agar sizga dasturchi kerak bo'lsa, savolingiz bo'lsa yoki
							shunchaki bog'lanmoqchi bo'lsangiz, men bilan bog'laning. Quyidagi
							formasdan foydalaning yoki bevosita menga xabar yuboring. Keling,
							birgalikda zamonaviy web-sitelar yaratamiz!
						</p>

						<div className='contact-methods'>
							<div className='contact-info-card'>
								<h3>
									<FaEnvelope /> Email
								</h3>
								<p>wehua727@gmail.com</p>
								<a
									href='mailto:wehua727@gmail.com'
									className='btn primary contact-btn'
								>
									Email yuborish
								</a>
							</div>

							<div className='contact-info-card'>
								<h3>
									<FaPhone /> Telefon
								</h3>
								<p>+998 91 405 84 81</p>
								<a href='tel:+998914058481' className='btn primary contact-btn'>
									Qo'ng'iroq qilish
								</a>
							</div>

							<div className='contact-info-card'>
								<h3>
									<FaMapMarkerAlt /> Manzil
								</h3>
								<p>O'zbekiston, Buxoro, G'ijduvon</p>
								<button
									className='btn primary contact-btn'
									onClick={() =>
										window.open(
											"https://www.google.com/maps/search/?api=1&query=O'zbekiston,Buxoro,G'ijduvon",
											'_blank'
										)
									}
								>
									Xaritada ko'rish
								</button>
							</div>
						</div>

						<div className='contact-form'>
							<h3>Xabar yuborish</h3>
							<form onSubmit={handleSubmit}>
								<div className='form-group'>
									<input
										type='text'
										placeholder='Ismingiz'
										value={formData.name}
										onChange={e =>
											setFormData({ ...formData, name: e.target.value })
										}
										required
									/>
								</div>
								<div className='form-group'>
									<input
										type='email'
										placeholder='Email manzilingiz'
										value={formData.email}
										onChange={e =>
											setFormData({ ...formData, email: e.target.value })
										}
										required
									/>
								</div>
								<div className='form-group'>
									<input
										type='text'
										placeholder='Mavzu'
										value={formData.subject}
										onChange={e =>
											setFormData({ ...formData, subject: e.target.value })
										}
										required
									/>
								</div>
								<div className='form-group'>
									<textarea
										placeholder='Xabaringiz'
										rows='5'
										value={formData.message}
										onChange={e =>
											setFormData({ ...formData, message: e.target.value })
										}
										required
									></textarea>
								</div>
								<button
									type='submit'
									className='btn primary form-btn'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Yuborilmoqda...' : 'Xabar yuborish'}
								</button>
							</form>
							{submitStatus && (
								<div className={`submit-status ${submitStatus.type}`}>
									{submitStatus.message}
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='footer'>
				<div className='container'>
					<p>&copy; 2025 Javohir Fozilov. Barcha huquqlar himoyalangan.</p>
				</div>
			</footer>
		</div>
	)
}

export default App
