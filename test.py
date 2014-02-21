import os, sys, unittest


if __name__ == '__main__':
    tests_dir = 'tests'
    test_modules = ['%s.' % tests_dir + filename.replace('.py', '') for filename in os.listdir('./%s' % tests_dir)
                  if filename.endswith('.py') and not filename.startswith('__')]
    map(__import__, test_modules)

    suite = unittest.TestSuite()
    for mod in [sys.modules[modname] for modname in test_modules]:
        suite.addTest(unittest.TestLoader().loadTestsFromModule(mod))
    unittest.TextTestRunner(verbosity=2).run(suite)